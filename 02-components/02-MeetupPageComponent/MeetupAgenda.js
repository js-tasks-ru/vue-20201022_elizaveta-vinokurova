import { MeetupAgendaItem } from './MeetupAgendaItem.js';

export const MeetupAgenda = {
    name: 'MeetupAgenda',

    template: `
        <div class="meetup-agenda">
            <p class="meetup-agenda__empty" v-if="!agenda || !agenda.length">Программа пока пуста, но когда-нибудь в ней обязательно что-нибудь появится!</p>
            <meetup-agenda-item v-else
                v-for="agendaItem in agenda"
                :agenda-item="agendaItem"
                :key="agendaItem.id"
            ></meetup-agenda-item>
        
        </div>
    `,

    components: {
        MeetupAgendaItem,
    },

    props: {
        agenda: {
            type: Array,
            required: true,
        }
    }
};
