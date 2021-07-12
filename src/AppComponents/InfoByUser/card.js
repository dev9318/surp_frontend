import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import { makeStyles, Container } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { yellow, green, pink, blue } from "@material-ui/core/colors";

const useStyles = makeStyles({
  bg: {
    backgroundColor: (list) => {
      if (list.keyword == "A") {
        return yellow[700];
      }
      if (list.keyword == "C") {
        return green[500];
      }
      if (list.keyword == "B") {
        return pink[500];
      }
      return blue[500];
    },
  },
  cont: {
    marginTop: 30,
  },
});

export default function NoteCard({ list, handleDelete }) {
  const classes = useStyles(list);

  return (
    <div>
      <Container className={classes.cont}>
        <Card elevation={1} className={classes.bg}>
          <CardHeader
            // avatar={
            // <Avatar className={classes.avatar}>
            //   {list.keyword[0].toUpperCase()}
            // </Avatar>
            // }
            action={
              <IconButton onClick={() => handleDelete(list.id)}>
                <DeleteOutlined />
              </IconButton>
            }
            title={list.author}
            subheader={list.selectedDate}
          />
          <CardContent>
            <Typography variant="h4" color="textPrimary">
              {list.industry}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {list.details}
            </Typography>
            <Typography variant="caption">{list.keyword}</Typography>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
