/*
  Полезные функции по работе с датой можно описать вне Vue компонента
 */
const getDay = (date) => { // получить номер дня недели, от 0 (пн) до 6 (вс)
    let day = date.getDay();
    if (day === 0) day = 7; // сделать воскресенье (0) последним днем
    return day - 1;
}

const MONTHS = {
    '0': 'Январь',
    '1': 'Февраль',
    '2': 'Март',
    '3': 'Апрель',
    '4': 'Май',
    '5': 'Июнь',
    '6': 'Июль',
    '7': 'Август',
    '8': 'Сентябрь',
    '9': 'Октябрь',
    '10': 'Ноябрь',
    '11': 'Декабрь',
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
                <div class="rangepicker__cell rangepicker__cell_inactive"
                    v-for="day in calendarDays"
                >{{ day }}</div>
              </div>
            </div>
        </div>
        
<!--        <div class="rangepicker">-->
<!--            <div class="rangepicker__calendar">-->
<!--              <div class="rangepicker__month-indicator">-->
<!--                <div class="rangepicker__selector-controls">-->
<!--                  <button class="rangepicker__selector-control-left"></button>-->
<!--                  <div>Июнь 2020</div>-->
<!--                  <button class="rangepicker__selector-control-right"></button>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="rangepicker__date-grid">-->
<!--                <div class="rangepicker__cell rangepicker__cell_inactive">28</div>-->
<!--                <div class="rangepicker__cell rangepicker__cell_inactive">29</div>-->
<!--                <div class="rangepicker__cell rangepicker__cell_inactive">30</div>-->
<!--                <div class="rangepicker__cell rangepicker__cell_inactive">31</div>-->
<!--                <div class="rangepicker__cell">-->
<!--                  1-->
<!--                  <a class="rangepicker__event">Митап</a>-->
<!--                  <a class="rangepicker__event">Митап</a>-->
<!--                </div>-->
<!--                <div class="rangepicker__cell">2</div>-->
<!--                <div class="rangepicker__cell">3</div>-->
<!--              </div>-->
<!--            </div>-->
<!--        </div>-->
`,

    props: {
        meetups: {
            type: Array,
            required: true,
        }
    },

    data() {
        return {
            currentDate: new Date(),
            lastMonthDate: '',
        }
    },

    computed: {
        currentYear() {
            return new Date(this.currentDate).getFullYear();
        },

        currentMonth() {
            return new Date(this.currentDate).getMonth();
        },

        printDate() {
            return `${MONTHS[this.currentMonth]} ${this.currentYear}`;
        },

        initialDate() {
            return new Date(this.currentYear, this.currentMonth);
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
                days.push(new Date(lastDay.setDate(lastDay.getDate() - (this.initialWeekDay - i))).getDate());
            }
            return days;
        },

        // собираем дни текущего месяца
        monthDays() {
            let days = [];
            let currentDate = new Date(this.initialDate);

            while (currentDate.getMonth() === this.currentMonth) {
                days.push(new Date(currentDate).getDate());
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
                days.push(new Date(nextDay.setDate(nextDay.getDate() + 1)).getDate());
            }
            return days;
        },

        calendarDays() {
            return this.previousDays.concat(this.monthDays).concat(this.nextDays);
        }
    },

    methods: {
        showPreviousMonth() {
            this.currentDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth() - 1));
        },

        showNextMonth() {
            this.currentDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth() + 1));
        },
    },

    mounted() {

    }
};
