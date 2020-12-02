import { Meteor } from 'meteor/meteor';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from '../imports/ui/App.svelte';

Meteor.startup(() => {
        // eslint-disable-next-line no-new
        new App({
                target: document.getElementById('app'),
        });
});
