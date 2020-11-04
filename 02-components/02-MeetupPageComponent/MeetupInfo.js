import { getDateOnlyString } from "./data.js";

export const MeetupInfo = {
    template: `
    <ul class="info-list">
        <li>
            <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-user.svg"/>
            {{ organizer }}
        </li>
        <li>
            <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-map.svg"/>
            {{ place }}
        </li>
        <li>
            <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg"/>
            <time :datetime="formattedDate ">{{ printDate }}</time>
        </li>
    </ul>`,

    props: {
        organizer: {
            type: String,
            required: true,
        },
        place: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
            default: new Date(),
        }
    },

    computed: {
        printDate() {
            return new Date(this.date).toLocaleString(navigator.language, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        },

        formattedDate() {
            return getDateOnlyString(new Date(this.date));
        },
    }
};
