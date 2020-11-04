import { MeetupView } from './MeetupView.js';
import { MEETUP_ID, fetchMeetup } from './data.js';

export const MeetupPage = {
    name: 'MeetupPage',

    template: `
        <div id="app">
            <meetup-view v-if="meetup" :meetup="meetup"></meetup-view>
        </div>
    `,

    components: {
      MeetupView,
    },

    // просто поиграться, чтобы из devTools можно было переключать странички
    props: {
        meetupId: {
            type: Number,
            default: 6,
        }
    },
    //

    data() {
        return {
            meetup: null,
        }
    },

    methods: {
        async getMeetups(id) {
            this.meetup = await fetchMeetup(id);
        }
    },

    // просто поиграться, чтобы из devTools можно было переключать странички
    watch: {
        meetupId(newValue) {
            const MIN = 1, MAX = 7;
            let newMeetupId = newValue < MIN ? MIN : (newValue > MAX ? MAX : newValue);

            if (this.meetupId === newMeetupId) {
                this.getMeetups(newMeetupId);
            }
        }
    },
    //

    mounted() {
        this.getMeetups(this.meetupId);
    }
};
