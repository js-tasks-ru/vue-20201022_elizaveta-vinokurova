import {agendaItemIcons, agendaItemTitles} from "./data.js";

export const MeetupAgendaItem = {
    name: 'MeetupAgendaItem',

    template: `               
        <div class="meetup-agenda__item">
            <div class="meetup-agenda__item-col">
                <img class="icon" alt="icon"
                     :src="\`/assets/icons/icon-\${agendaItemProcessed.icon}.svg\`"/>
            </div>
            <div class="meetup-agenda__item-col">{{ \`\${agendaItemProcessed.startsAt} - \${agendaItemProcessed.endsAt}\` }}</div>
            <div class="meetup-agenda__item-col">
                <h5 class="meetup-agenda__title">{{ agendaItemProcessed.title }}</h5>
                <p v-if="agendaItemProcessed.type === 'talk'">
                    <span>{{ agendaItemProcessed.speaker }}</span>
                    <span class="meetup-agenda__dot"></span>
                    <span class="meetup-agenda__lang">{{ agendaItemProcessed.language }}</span>
                </p>
                <p v-if="agendaItemProcessed.description">{{ agendaItemProcessed.description }}</p>
            </div>
        </div>
    `,

    props: {
        agendaItem: {
            type: Object,
            required: true,
        }
    },

    computed: {
        agendaItemProcessed() {
            return {
                ...this.agendaItem,
                title: this.agendaItem.title || agendaItemTitles[this.agendaItem.type],
                icon: agendaItemIcons[this.agendaItem.type] || 'cal-sm',
            }
        },
    },
};
