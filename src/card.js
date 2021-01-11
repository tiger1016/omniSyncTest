import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import marked from "marked";
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles(theme=> ({
  root: {
    minWidth: 275,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 50,
    backgroundColor: '#0fff0030',
    position: 'relative',
    cursor: 'pointer'
  },
  disabledRoot: {
    minWidth: 275,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 50,
    backgroundColor: 'grey',
    position: 'relative',
    cursor: 'pointer'
  },
  title: {
    fontSize: 14
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const CustomCard = ({ item, onClick, index }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleExpandClick = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const onClickItem = (e) => {
    if (item.current_status === 'open') {
      setClicked(state => !state);
      onClick(index);
    }
  }
  
  return (
    <>
      <Card className={item.current_status === 'open' ? classes.root : classes.disabledRoot} onClick={onClickItem}>
        {
          clicked && <CheckIcon style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}/>
        }
        <CardHeader              
          title={item.solicitation_title}
          subheader={item.solicitation_number}
        />
        <CardContent>
          <Typography paragraph>
            Program: {item.program}
          </Typography>
          <Typography paragraph>
            Phase: {item.phase}
          </Typography>
          <Typography paragraph>
            Agency: {item.agency}
          </Typography>
          <Typography paragraph>
            Branch: {item.branch}
          </Typography>
          <Typography paragraph>
            Solicitation Year: {item.solicitation_year}
          </Typography>
          <Typography paragraph>
            Release Date: {item.release_date}
          </Typography>
          <Typography paragraph>
            Open Date: {item.open_date}
          </Typography>
          <Typography paragraph>
            Close Date: {item.close_date}
          </Typography>              
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={() => window.location.assign(item.sbir_solicitation_link)}>
            <FavoriteIcon/>
          </IconButton>
          <IconButton aria-label="share" onClick={() => window.location.assign(item.solicitation_agency_url)}>
            <ShareIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <article dangerouslySetInnerHTML={{__html: marked(item.solicitation_topics[0] ? item.solicitation_topics[0].topic_description : '' )}}></article>
          </CardContent>
        </Collapse>
      </Card>
    </>
  )
}

export default CustomCard;