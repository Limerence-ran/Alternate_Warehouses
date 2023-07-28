import React from 'react';

const containerStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f5f5f5',
};

const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
};

const contentStyle = {
    fontSize: '16px',
    lineHeight: '1.5',
};

function UserAgreementPage() {
    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>User Agreement</h1>
            <p style={contentStyle}>
                Here is the content of the user agreement...
            </p>
        </div>
    );
}

export default UserAgreementPage;