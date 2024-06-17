import { ListItem, Paper } from "@mui/material";
import React, { useState, useEffect } from "react";
import star from "../assets/star.png";
import refresh from "../assets/refresh.png";
import remove from "../assets/bin.png";
import yellow from "../assets/yellow.png";
import snooze from "../assets/snooze.png";
import blueDot from "../assets/blueDot.png";
import { useGetMail } from "../hooks/useGetMail";
import { useDeleteMail } from "../hooks/useDeleteMail";
import { useStarMail } from "../hooks/useStarMail";
import { useSnoozeMail } from "../hooks/useSnoozeMail";
import { useMarkAsRead } from "../hooks/useMarkAsRead";

function Middle(props) {
  const { mailData, unreadCount, getMail } = useGetMail(props.subCollect);
  const { deleteMail } = useDeleteMail();
  const { starred } = useStarMail();
  const { snoozed } = useSnoozeMail();
  const [show, setShow] = useState(false);
  const { markAsRead } = useMarkAsRead(props.setMailData, props.setUnreadCount);

  useEffect(() => {
    getMail();
  }, [props.subCollect, props.search]);

  const filteredMailData = props.search
    ? mailData.filter((data) => data.sender === props.search)
    : mailData;

  return (
    <div style={{ marginLeft: "2.9vw", width: "75vw" }}>
      <img
        src={refresh}
        alt="Refresh"
        style={{
          width: "1.5vw",
          height: "1.5vw",
          marginLeft: "1.5vw",
          marginTop: "2vw",
        }}
        onClick={getMail}
      />
      {filteredMailData.map((data) => (
        <Paper
          key={data.id}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          elevation={0}
          style={{
            backgroundColor: "#F8FCFF",
            borderBottom: "1px solid #EFEFEF",
            borderTop: "1px solid #EFEFEF",
          }}
        >
          <ListItem
            onClick={() => {
              markAsRead(data, props.subCollect);
              props.onMessageClick(data);
            }}
          >
            {data.starred ? (
              <img
                src={yellow}
                alt="Starred"
                style={{
                  cursor: "pointer",
                  width: "1.4vw",
                  height: "1.4vw",
                }}
              />
            ) : (
              <img
                onClick={() => starred(data)}
                src={star}
                alt="Star"
                style={{
                  cursor: "pointer",
                  width: "1.4vw",
                  height: "1.4vw",
                }}
              />
            )}
            <span
              style={{
                fontSize: "1.3vw",
                marginLeft: "1.2vw",
                fontWeight: "500",
              }}
            >
              {data.sender}
              <span
                style={{
                  marginLeft: "12vw",
                  fontWeight: "200",
                  marginLeft: "1vw",
                  cursor: "pointer",
                }}
              >
                {data.email}
              </span>
            </span>
            {show && (
              <img
                onClick={() => snoozed(data)}
                src={snooze}
                alt="Snooze"
                style={{
                  marginLeft: "1vw",
                  width: "1.3vw",
                  height: "1.3vw",
                  cursor: "pointer",
                }}
              />
            )}
            {show && (
              <img
                onClick={() => deleteMail(data)}
                src={remove}
                alt="Delete"
                style={{
                  width: "1.1vw",
                  height: "1.1vw",
                  marginLeft: "1vw",
                  cursor: "pointer",
                }}
              />
            )}
            {!data.read && (
              <img
                src={blueDot}
                alt="Unread"
                style={{ marginLeft: "0.5vw", width: "0.5vw" }}
              />
            )}
          </ListItem>
        </Paper>
      ))}
      <h6 style={{ fontWeight: "400", marginLeft: "28vw", fontSize: "1vw" }}>
        Terms · Privacy · Program Policies
      </h6>
      <div style={{ marginLeft: "2.9vw", marginTop: "1vw", fontSize: "1.2vw" }}>
        Unread messages: {unreadCount}
      </div>
    </div>
  );
}

export default Middle;
