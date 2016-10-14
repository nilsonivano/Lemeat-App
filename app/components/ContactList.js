import React from 'react';
import{
    Text,
    View,
    StyleSheet
} from 'react-native';

import ContactRow from './ContactRow';
import {colors} from '../config/styles';

class ContactList extends React.Component {
    getFacebook() {
        var contacts = this.props.contacts;
        if (contacts.facebook) {
            if (contacts.facebook.length > 1) {
                return (
                    <ContactRow
                        contactTypeIcon="logo-facebook"
                        contactType="Facebook"
                        contactText={contacts.facebook}
                    />
                )
            }
        }
    }

    getInstagram() {
        var contacts = this.props.contacts;
        if (contacts.instagram) {
            if (contacts.instagram.length > 1) {
                return (
                    <ContactRow
                        contactTypeIcon="logo-instagram"
                        contactType="Instagram"
                        contactText={contacts.instagram}
                    />
                )
            }
        }
    }

    getTwitter() {
        var contacts = this.props.contacts;
        if (contacts.twitter) {
            if (contacts.twitter.length > 1) {
                return (
                    <ContactRow
                        contactTypeIcon="logo-twitter"
                        contactType="Twitter"
                        contactText={contacts.twitter}
                    />
                )
            }
        }
    }

    getWebsite() {
        var contacts = this.props.contacts;
        if (contacts.website) {
            if (contacts.website.length > 1) {
                return (
                    <ContactRow
                        contactTypeIcon="md-desktop"
                        contactType="Website"
                        contactText={contacts.website}
                    />
                )
            }
        }
    }

    getEmail() {
        var contacts = this.props.contacts;
        if (contacts.email) {
            if (contacts.email.length > 1) {
                return (
                    <ContactRow
                        contactTypeIcon="md-mail"
                        contactType="Email"
                        contactText={contacts.email}
                    />
                )
            }
        }
    }

    getPhone() {
        var contacts = this.props.contacts;
        if (contacts.phone) {
            if (contacts.phone.length > 1) {
                return (
                    <ContactRow
                        contactTypeIcon="md-phone-portrait"
                        contactType="Telefone"
                        contactText={contacts.phone}
                    />
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