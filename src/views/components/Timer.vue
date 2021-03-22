<template>
    <transition name="fade">
        <div style="width:200px;" v-if="timerWidgetVisible">
            <div class="base-timer">
                <svg class="base-timer-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <g class="base-timer-svg-circle">
                        <circle class="base-timer-svg-path-elapsed" cx="50" cy="50" r="45" />
                        <path  :stroke-dasharray="strokeDasharray"
                            class="base-timer-svg-path-remaining"
                            d="
                                M 50, 50
                                m -45, 0
                                a 45,45 0 1,0 90,0
                                a 45,45 0 1,0 -90,0">
                        </path> 
                    </g>
                </svg>
                <span class="base-timer-label">
                    {{timerLabel}}
                </span>
            </div>
            <div style="width:100%; text-align:center; margin-top:10px;">
                <button @click="stop()">Stop</button>
            </div>
        </div>
    </transition>
</template>


<script lang="ts">
/**
 * https://css-tricks.com/how-to-create-an-animated-countdown-timer-with-html-css-and-javascript/
 */

    import Vue from 'vue';
    import Component from 'vue-class-component';
    import { Watch } from 'vue-property-decorator';
    import { namespace } from 'vuex-class';

    const timerModule = namespace('timer');

    const FULL_DASH_ARRAY = 283;

    @Component
    export default class TimeComponent extends Vue {

        @timerModule.State
        public timerWidgetVisible!: boolean;

        @timerModule.State
        public time !: Date;

        @timerModule.Action
        public stop !: () => void;

        public initialTimeDuration: number = 0;
        public timerLabel: string = '';
        public strokeDasharray: string = '283';

        private timerInterval: number | null = null;

        private computeTimerValues() {
            const timeLeftInSeconds  = Math.round((this.time!.getTime() - Date.now()) / 1000);

            if (timeLeftInSeconds <= 0) {
                this.timerLabel = `00:00`;
                this.strokeDasharray = ``;
                if (this.timerInterval) {
                    clearInterval(this.timerInterval);
                }
                return;
            }

            // compute the new timer label
            const minutes = Math.floor(timeLeftInSeconds / 60);
            let seconds = `${timeLeftInSeconds % 60}`;
            if (timeLeftInSeconds % 60 < 10) {
                seconds = `0${seconds}`;
            }
            this.timerLabel = `${minutes}:${seconds}`;

            // compute the timer circle
            const rawTimeFraction = timeLeftInSeconds / this.initialTimeDuration;
            const timeFraction =  rawTimeFraction - (1 / this.initialTimeDuration) * (1 - rawTimeFraction);
            this.strokeDasharray = `${(timeFraction * FULL_DASH_ARRAY).toFixed(0)} 283`;
        }

        /**
         * Initialize the timer
         */
        private initTimer() {
            if (this.timerInterval) {
                clearInterval(this.timerInterval);
                this.timerInterval = null;
            }

            if (this.timerWidgetVisible) {
                // init the initial duration of the timer - used for the circle
                this.initialTimeDuration = Math.round((this.time!.getTime() - Date.now()) / 1000);

                this.computeTimerValues();
                this.timerInterval = setInterval(() => {
                    this.computeTimerValues();
                }, 1000);
            }
        }


        /**
         * When the widget becomes visible, we need to set up the timer and intervall
         * if it becomes hidden, then we can clear the intervall
         */
        @Watch('timerWidgetVisible')
        private onTimerWidgetVisibleChanged() {
            this.initTimer();
        }

        private mounted() {
            this.timerInterval = null;
            // need to trigger it to init the timer if it has to be started
            this.initTimer();
        }

        private beforeDestroy() {
            if (this.timerInterval) {
                clearInterval(this.timerInterval);
            }
        }
    }
</script>

<style scoped>
    .base-timer {
        position: relative;
        height: 200px;
        width: 200px;
    }

    /* Removes SVG styling that would hide the time label */
    .base-timer-svg-circle {
        fill: none;
        stroke: none;
    }

    /* The SVG path that displays the timer's progress */
    .base-timer-svg-path-elapsed {
        stroke-width: 7px;
        stroke: grey;
    }

    .base-timer-label {
        position: absolute;
        
        /* Size should match the parent container */
        width: 200px;
        height: 200px;
        
        /* Keep the label aligned to the top */
        top: 0;
        
        /* Create a flexible box that centers content vertically and horizontally */
        display: flex;
        align-items: center;
        justify-content: center;

        /* Sort of an arbitrary number; adjust to your liking */
        font-size: 30px;
        }

    .base-timer-svg-path-remaining {
        /* Just as thick as the original ring */
        stroke-width: 7px;

        /* Rounds the line endings to create a seamless circle */
        stroke-linecap: round;

        /* Makes sure the animation starts at the top of the circle */
        transform: rotate(90deg);
        transform-origin: center;

        /* One second aligns with the speed of the countdown timer */
        transition: 1s linear all;

        /* Allows the ring to change color when the color value updates */
        stroke: currentColor;
    }

    .base-timer-svg {
        /* Flips the svg and makes the animation to move left-to-right */
        transform: scaleX(-1);
    }
</style>