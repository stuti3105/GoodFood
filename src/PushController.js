import react, {Component} from 'react';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

export default class PushControlller  extends Component{
   
    componentDidMount(){
        PushNotification.configure({
            onNotification: function (notification) {
                console.log("NOTIFICATION:", notification);
            }
        });
    }

    render(){
        return null;
    }
}