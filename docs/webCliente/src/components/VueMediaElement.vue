<template>
    <div>
        <video
                id="player"
                style="max-width: 100%"
                :src="video.src"
                :type="video.type"
                class="mejs-mediaelement"
                :data-mejoptions="mediaElementPlayerOptions">
            <source :src="video.src" :type="video.type">
        </video>
    </div>
</template>
<script>
    import 'mediaelement/build/mediaelement-and-player.min';
    import playerBus from '../playerBus';
    import 'mediaelement/build/renderers/vimeo.min';
    import 'mediaelement/build/renderers/dailymotion.min';
    import 'mediaelement/build/renderers/facebook.min';
    import 'mediaelement/build/renderers/twitch.min';

    export default {
        data() {
            return {
                player: MediaElementPlayer,
                mediaElementPlayerOptions: {
                    stretching: 'responsive'
                },
                video: {
                    src: '',
                    type: ''
                },
                playing: false
            }
        },
        mounted() {
            var _this = this;
            this.initPlayer();
            playerBus.$on('toPlay', function (video) {
                _this.video.src = video.src;
                _this.video.type = video.type;
                _this.player.setSrc(video.src);
                _this.player.load();
            });
            playerBus.$on('startPlay', function () {
                _this.player.play();
            });
            playerBus.$on('setCurrentTime', function (currentTime) {
                _this.player.setCurrentTime(Number(currentTime || 0));
            });
            playerBus.$on('beforeDestroy', function () {
                this.playing = false;
                this.player.pause();
                this.player.remove();
            });
            setInterval(function () {
                if (_this.playing === true) {
                    playerBus.$emit('whilePlaying', {
                        duration: _this.player.getDuration() || 0,
                        currentTime: _this.player.getCurrentTime() || 0
                    });
                }
            }, 1000);
        },
        beforeDestroy() {
            this.playing = false;
            this.player.pause();
            this.player.remove();
        },
        methods: {
            initPlayer() {
                var _this = this;
                this.player = new MediaElementPlayer('player', {
                    renderers: ['html5', 'youtube_iframe', 'vimeo_iframe', 'twitch_iframe', 'dailymotion_iframe', 'facebook'],
                    success: function (media, originalNode, instance) {
                        media.addEventListener('loadedmetadata', function () {
                            playerBus.$emit('loadedmetadata', _this.player.getDuration());
                        });
                        media.addEventListener('progress', function () {
                            playerBus.$emit('progress', _this.player.getCurrentTime());
                        });
                        media.addEventListener('timeupdate', function () {
                            playerBus.$emit('timeupdate', _this.player.getCurrentTime());
                        });
                        media.addEventListener('play', function () {
                            playerBus.$emit('play', {
                                currentSrc: _this.player.getSrc(),
                                currentTime: _this.player.getCurrentTime(),
                                duration: _this.player.getDuration(),
                                volumne: _this.player.getVolume()
                            });
                        });
                        media.addEventListener('playing', function () {
                            _this.playing = true;
                            playerBus.$emit('playing', {
                                currentSrc: _this.player.getSrc(),
                                currentTime: _this.player.getCurrentTime(),
                                duration: _this.player.getDuration(),
                                volumne: _this.player.getVolume()
                            });
                        });
                        media.addEventListener('pause', function () {
                            _this.playing = false;
                            playerBus.$emit('pause', {
                                currentSrc: _this.player.getSrc(),
                                currentTime: _this.player.getCurrentTime(),
                                duration: _this.player.getDuration(),
                                volumne: _this.player.getVolume()
                            });
                        });
                        media.addEventListener('ended', function () {
                            _this.playing = false;
                            playerBus.$emit('ended', {
                                currentSrc: _this.player.getSrc(),
                                currentTime: _this.player.getCurrentTime(),
                                duration: _this.player.getDuration(),
                                volumne: _this.player.getVolume()
                            });
                        });
                    }
                });
            }
        }
    }
</script>
<style>
    @import "~mediaelement/build/mediaelementplayer.min.css";
</style>