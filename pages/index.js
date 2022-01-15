import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Menu from "@components/Main/Menu";

import useAppAuth from "@hooks/app/useAppAuth";
import useAppResources from "@hooks/app/useAppResources";
import { useAuthSession } from "@hooks/useAuthSession";
import useLabels from "@hooks/useLabels";
import useLogout from "@hooks/useLogout";

import {
  Avatar,
  Box,
  Button,
  Grid,
  GridListTile,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Paper,
  Typography,
} from "@mui/material";
import SettingsForm from "@components/LoginForm/SettingsForm";
import LabelsForm from "@components/LabelsForm";

const Home = () => {
  const user = useAuthSession();
  const token = useAppAuth();
  const [resources] = useAppResources();
  console.log(resources);
  const { isError, isLoading, labels } = useLabels();
  console.log({ isError, isLoading, labels });
  const dispatch = useDispatch();
  const logout = useLogout();
  const handleOnClick = (e) => {
    logout();
  };
  const handleOnClickLabels = () => {
    setLabels(resources);
  };
  useEffect(() => {
    console.log("labels changed");
  }, [labels]);
  const handleCreateSpace = () => {};

  return !user ? null : (
    <Grid container>
      <Grid item>
        <Menu></Menu>
      </Grid>
      <Grid item>
        <Typography variant="h1">{token?.name}</Typography>
        <Button onClick={handleOnClick}>Logout</Button>
        <Button onClick={handleOnClickLabels}>Load labels</Button>
        <Button onClick={handleCreateSpace}>Create space</Button>
        <Paper>
          {isLoading ? (
            "loading..."
          ) : (
            <List subheader={<ListSubheader disableSticky>Labels</ListSubheader>}>
              {labels.map((label, key) => (
                <ListItem key={key}>
                  <ListItemAvatar>
                    <Avatar
                      sx={{ bgcolor: "#" + label.color }}
                      alt={label.name}
                    >
                      {" "}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={label.name}
                    secondary={label.description}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Home;
