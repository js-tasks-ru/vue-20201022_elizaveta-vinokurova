const getDay = (date) => { // получить номер дня недели, от 0 (пн) до 6 (вс)
    let day = date.getDay();
    if (day === 0) day = 7; // сделать воскресенье (0) последним днем
    return day - 1;
}

const WEEK = 7;

export const MeetupsCalendar = {
    name: 'MeetupsCalendar',

    template: `
        <div class="rangepicker">
            <div class="rangepicker__calendar">
              <div class="rangepicker__month-indicator">
                <div class="rangepicker__selector-controls">
                  <button class="rangepicker__selector-control-left" @click="showPreviousMonth"></button>
                  <div>{{ printDate }}</div>
                  <button class="rangepicker__selector-control-right" @click="showNextMonth"></button>
                </div>
              </div>
              <div class="rangepicker__date-grid">
                <div class="rangepicker__cell"
                     v-for="day in calendarDays"
                     :class="{ 'rangepicker__cell_inactive': !day.isCurrentMonth }"
                     
                >{{ day.number }}
                    <template v-if="day.meetups && day.meetups.length > 0">
                        <a class="rangepicker__event"
                           v-for="meetup in day.meetups"
                        >{{ meetup.title }}</a>                        
                    </template>
                </div>
              </div>
            </div>
        </div>
    `,

    props: {
        meetups: {
            type: Array,
            required: true,
        }
    },

    data() {
        return {
            initialDate: new Date(new Date().setDate(1)),
            lastMonthDate: '',
        }
    },

    computed: {
        currentMonth() {
            return new Date(this.initialDate).getMonth();
        },

        printDate() {
            let month = this.initialDate.toLocaleString(navigator.language, {
                month: 'long',
            });

            return `${month} ${this.initialDate.getFullYear()}`;
        },

        initialWeekDay() {
            return getDay(this.initialDate);
        },

        lastWeekDay() {
            return getDay(this.lastMonthDate);
        },

        // собираем дни предыдущего месяца, попадающие в раскладку текущего
        previousDays() {
            let days = [];
            for (let i = 0; i < this.initialWeekDay; i++) {
                // если без new Date, то initialDate тоже начинает меняться (Оо)
                let lastDay = new Date(this.initialDate);
                let day = new Date(lastDay.setDate(lastDay.getDate() - (this.initialWeekDay - i)));
                days.push(this.getOneCalendarDay(day));
            }
            return days;
        },

        // собираем дни текущего месяца
        monthDays() {
            let days = [];
            let currentDate = new Date(this.initialDate);

            while (currentDate.getMonth() === this.currentMonth) {
                let day = new Date(currentDate);
                days.push(this.getOneCalendarDay(day));
                currentDate.setDate(currentDate.getDate() + 1);
            }
            this.lastMonthDate = new Date(currentDate.setDate(currentDate.getDate() - 1));
            return days;
        },

        // собираем дни слудеющего месяца, попадающие в раскладку текущего
        nextDays() {
            let days = [];
            let nextDay = new Date(this.lastMonthDate);
            for (let i = this.lastWeekDay + 1; i < WEEK; i++) {
                let day = new Date(nextDay.setDate(nextDay.getDate() + 1));
                days.push(this.getOneCalendarDay(day));
            }
            return days;
        },

        calendarDays() {
            return this.previousDays.concat(this.monthDays).concat(this.nextDays);
        },

        // TODO: доработать, сделать включение только тех митапов, которые попадают в крайние дни
        actualMeetups() {
            return this.meetups.filter(meetup => {
                let meetupMonth = new Date(meetup.date).getMonth();
                return  meetupMonth >= (this.currentMonth - 1) && meetupMonth <= (this.currentMonth + 1);
            })
        }
    },

    methods: {
        getOneCalendarDay(date) {
            return {
                number: date.getDate(),
                date: date,
                isCurrentMonth: date.getMonth() === this.initialDate.getMonth(),
                meetups: this.addMeetups(date),
            }
        },

        addMeetups(date) {
            let meetups = [];
            this.actualMeetups.forEach(meetup => {
                let calendarDate = new Date(date);
                let meetupDate = new Date(meetup.date);
                if (calendarDate.toLocaleDateString() === meetupDate.toLocaleDateString()) {
                    meetups.push(meetup);
                }
            });
            return meetups;
        },

        showPreviousMonth() {
            this.initialDate = new Date(this.initialDate.setMonth(this.initialDate.getMonth() - 1));
        },

        showNextMonth() {
            this.initialDate = new Date(this.initialDate.setMonth(this.initialDate.getMonth() + 1));
        },
    },
};
