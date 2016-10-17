import React from 'react';
import{
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import ContactRow from './ContactRow';
import {colors} from '../config/styles';
import Communications from 'react-native-communications';

class ContactList extends React.Component {
    getFacebook() {
        var contacts = this.props.contacts;
        if (contacts.facebook) {
            if (contacts.facebook.length > 1) {
                return (
                    <TouchableOpacity onPress={() => Communications.web(contacts.facebook)}>
                        <ContactRow
                            contactTypeIcon="logo-facebook"
                            contactType="Facebook"
                            contactText={contacts.facebook}
                        />
                    </TouchableOpacity>
                )
            }
        }
    }

    getInstagram() {
        var contacts = this.props.contacts;
        if (contacts.instagram) {
            if (contacts.instagram.length > 1) {
                return (
                    <TouchableOpacity onPress={() => Communications.web(contacts.instagram)}>
                        <ContactRow
                            contactTypeIcon="logo-instagram"
                            contactType="Instagram"
                            contactText={contacts.instagram}
                        />
                    </TouchableOpacity>
                )
            }
        }
    }

    getTwitter() {
        var contacts = this.props.contacts;
        if (contacts.twitter) {
            if (contacts.twitter.length > 1) {
                return (
                    <TouchableOpacity onPress={() => Communications.web(contacts.twitter)}>
                        <ContactRow
                            contactTypeIcon="logo-twitter"
                            contactType="Twitter"
                            contactText={contacts.twitter}
                        />
                    </TouchableOpacity>
                )
            }
        }
    }

    getWebsite() {
        var contacts = this.props.contacts;
        if (contacts.website) {
            if (contacts.website.length > 1) {
                return (
                    <TouchableOpacity onPress={() => Communications.web(contacts.website)}>
                        <ContactRow
                            contactTypeIcon="md-desktop"
                            contactType="Website"
                            contactText={contacts.website}
                        />
                    </TouchableOpacity>
                )
            }
        }
    }

    getEmail() {
        var contacts = this.props.contacts;
        if (contacts.email) {
            if (contacts.email.length > 1) {
                return (
                    <TouchableOpacity onPress={() => Communications.email([contacts.email], null, null, '', '')}>
                        <ContactRow
                            contactTypeIcon="md-mail"
                            contactType="Email"
                            contactText={contacts.email}
                        />
                    </TouchableOpacity>
                )
            }
        }
    }

    getPhone() {
        var contacts = this.props.contacts;
        if (contacts.phone) {
            if (contacts.phone.length > 1) {
                return (
                    <TouchableOpacity onPress={() => Communications.phonecall(contacts.phone)}>
                        <ContactRow
                            contactTypeIcon="md-phone-portrait"
                            contactType="Telefone"
                            contactText={contacts.phone}
                        />
                    </TouchableOpacity>
                )
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.getEmail()}
                {this.getPhone()}
                {this.getFacebook()}
                {this.getInstagram()}
                {this.getTwitter()}
                {this.getWebsite()}
            </View>
        )
    }
}

ContactList.propTypes = {
    contacts: React.PropTypes.object
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'column'
    }
})

export default ContactList