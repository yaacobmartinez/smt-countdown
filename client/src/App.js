import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import React from 'react';
import { AlarmOff, AlarmOn, Delete, PlayArrow, Stop } from '@material-ui/icons';
import axios from 'axios';

function App() {
  const [start, setStart] = React.useState(null)
  const [logs, setLogs] = React.useState(null)
  const handleClick = async () => {
    if (start === null) {
      return setStart({
          timestamp: new Date(),
          log_type: 'start'
      })
    }
    const end = {timestamp: new Date(), log_type: 'stop'}
    const startResponse = await axios.post(`/api/logs`, start)
    console.log(startResponse.data)
    const endResponse = await axios.post(`/api/logs`,end)
    console.log(endResponse.data)
    setStart(null)
    return fetchLogs()
  }
  const handleRemove = async (item) => {
    console.log(item)
    const deleteItem = await axios.delete(`/api/logs/${item._id}`)
    console.log(deleteItem.data)
    return fetchLogs()
  }
  const fetchLogs = React.useCallback(async () => {
    const res = await axios.get(`/api/logs`)
    setLogs(res.data.logs)
  }, [])

  React.useEffect(() => {
    let cancelled = false
    if (!cancelled) fetchLogs()
    return () => cancelled = true
  },[fetchLogs])
  return (
    <div>
      <IconButton onClick={handleClick}>
        { start !== null
          ? <Stop fontSize='large' />
          : <PlayArrow fontSize='large' /> 
        }
      </IconButton>
      <List dense={true}>
        {logs?.map((item, index) => (
          <ListItem key={index} >
            <ListItemAvatar>
              <Avatar>
                {item.log_type === 'start'
                  ? <AlarmOn />
                  : <AlarmOff />
                }
              </Avatar>
            </ListItemAvatar>
            <ListItemText 
              primary={item.log_type === 'start' ? `Start Time`: `Stop Time` }
              secondary={new Date(item.timestamp).toLocaleString('en-GB')}
            />
            <ListItemSecondaryAction>
              <IconButton edge='end' onClick={() => handleRemove(item)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem> 
        ))}
      </List>
    </div>
  );
}

export default App;
