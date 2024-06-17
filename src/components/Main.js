import { Grid } from '@mui/material';
import React, { useState } from 'react';
import Navbar from './Navbar';
import Leftpanel from './Leftpanel';
import Middle from './Middle';
import Rightpanel from './Rightpanel';
import Footer from './Footer';
import MessageDetail from './MessageDetail';

function Main() {
    const [subCollect, setSubCollect] = useState("");
    const [search, setSearch] = useState("");
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [mailData, setMailData] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <Navbar setSearch={setSearch} />
                </Grid>
                <Grid item xs={2}>
                    <Leftpanel setSubCollect={setSubCollect} />
                </Grid>
                <Grid item xs={9}>
                    {selectedMessage ? (
                        <MessageDetail message={selectedMessage} onBack={() => setSelectedMessage(null)} />
                    ) : (
                        <Middle 
                            search={search} 
                            subCollect={subCollect} 
                            onMessageClick={setSelectedMessage} 
                            setMailData={setMailData} 
                            setUnreadCount={setUnreadCount}
                        />
                    )}
                </Grid>
                <Grid item xs={1}>
                    <Rightpanel />
                </Grid>
                <Grid item xs={12}>
                    <Footer />
                </Grid>
            </Grid>
        </div>
    );
}

export default Main;
