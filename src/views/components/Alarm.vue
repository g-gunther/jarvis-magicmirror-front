<template>
    <transition name="fade">
        <div style="width:240px;" v-if="alarmWidgetVisible">
            <div style="display: flex; flex-direction: row;">
                <div class="icon-alarm"></div>
                <span style="font-size:35px;">{{alarmLabel}}</span>
            </div>
            <span>Dans {{remainingTimeLabel}}</span>
            <div style="width:100%; text-align:center; margin-top:10px;">
                <button @click="stop()">Stop</button>
            </div>
        </div>
    </transition>
</template>


<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import { Watch } from 'vue-property-decorator';
    import { namespace } from 'vuex-class';

    const alarmModule = namespace('alarm');

    @Component
    export default class AlarmComponent extends Vue {

        @alarmModule.State
        public alarmWidgetVisible !: boolean;

        @alarmModule.State
        public time !: Date;

        @alarmModule.Action
        public stop !: () => void;

        public remainingTimeLabel: string = '';
        private timerInterval: number | null = null;

        get alarmLabel() {
            return `${this.time?.getHours()}:${this.time?.getMinutes()}:${this.time?.getSeconds()}`;
        }

        private computeRemainingTimeLabel() {
            // remaining time in seconds
            const remainingTime: number = (this.time!.getTime() - Date.now()) / 1000;

            const hours: number = Math.floor(remainingTime / 3600);
            const totalSeconds: number = remainingTime % 3600;
            const minutes: number = Math.floor(totalSeconds / 60);

            let label: string = '';
            if (hours > 0) {
                label += `${hours} heures`;
            }
            if (minutes > 0) {
                if (label.length > 0) {
                    label += ` et `;
                }
                label += `${minutes} minutes`;
            }

            this.remainingTimeLabel = label;
        }

        private initTimer() {
            if (this.timerInterval) {
                clearInterval(this.timerInterval);
                this.timerInterval = null;
            }

            if (this.alarmWidgetVisible) {
                // compute the remaining time label to keep it up to date
                this.computeRemainingTimeLabel();
                this.timerInterval = setInterval(() => {
                    this.computeRemainingTimeLabel();
                }, 10000);
            }
        }

        /**
         * When the widget becomes visible, we need to set up the timer and intervall
         * if it becomes hidden, then we can clear the intervall
         */
        @Watch('alarmWidgetVisible')
        private onAlarmWidgetVisibleChanged() {
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
    .icon-alarm {
        background-image:url('../../assets/images/alarm.png');
        background-size: 50px 50px;
        width:50px;
        height:50px;
        border:none;
        outline:none;
        margin-right:5px;
        background-repeat: no-repeat;
    }
</style>