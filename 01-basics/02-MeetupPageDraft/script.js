import Vue from './vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 4;

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
function getMeetupCoverLink(meetup) {
    return `${API_URL}/images/${meetup.imageId}`;
}

/**
 * Вычисление отформатированной по заданному правилу даты
 * @param date – дата для обработки
 * @returns {string} - строка даты в заданном формате
 */

function getDateOnlyString(date) {
    const YYYY = date.getFullYear();
    const MM = (date.getMonth() + 1).toString().padStart(2, '0');
    const DD = date.getDate().toString().padStart(2, '0');
    return `${YYYY}-${MM}-${DD}`;
}

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
    registration: 'Регистрация',
    opening: 'Открытие',
    break: 'Перерыв',
    coffee: 'Coffee Break',
    closing: 'Закрытие',
    afterparty: 'Afterparty',
    talk: 'Доклад',
    other: 'Другое',
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
    registration: 'key',
    opening: 'cal-sm',
    talk: 'tv',
    break: 'clock',
    coffee: 'coffee',
    closing: 'key',
    afterparty: 'cal-sm',
    other: 'cal-sm',
};

export const app = new Vue({
    el: '#app',

    data: {
        meetup: null,
        agendaItemTitles: agendaItemTitles,
        agendaItemIcons: agendaItemIcons,
    },

    computed: {
        preparedMeetupData() {
            if (this.meetup) {
                return {
                    ...this.meetup,
                    coverLink: this.meetup.imageId ? getMeetupCoverLink(this.meetup) : '',
                    printDate: new Date(this.meetup.date).toLocaleString(navigator.language, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    }),
                    formattedDate: getDateOnlyString(new Date(this.meetup.date)),
                }
            }
        },
    },

    methods: {
        getMeetupData() {
            fetch(`${API_URL}/meetups/${MEETUP_ID}`)
                .then(response => response.json())
                .then(response => {
                    this.meetup = response;
                });
        },
    },

    mounted() {
        this.getMeetupData();
    },
});
