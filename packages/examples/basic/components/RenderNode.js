import React, { useEffect, useRef, useCallback } from 'react';
import { ROOT_NODE } from '@craftjs/utils';
import { useNode, useEditor } from '@craftjs/core';
import { SettingsPanel } from './SettingsPanel';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Portal from '@material-ui/core/Portal';
import Popper from '@material-ui/core/Popper';
import Tooltip from '@material-ui/core/Tooltip';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import OpenWithIcon from '@material-ui/icons/OpenWith';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreIcon from '@material-ui/icons/MoreVert';
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state';

const useStyles = makeStyles((theme) => {
  const backgroundColorDefault =
    theme.palette.type === 'light'
      ? theme.palette.primary.main
      : theme.palette.grey[900];
  return {
    indicator: {
      zIndex: 1101, // more than app-bar z-index
      marginTop: '-37px',
      fontSize: '12px',
      lineHeight: '12px',
      position: 'absolute',
      boxShadow: theme.shadows[2],
      '& svg': {
        fill: theme.palette.getContrastText(backgroundColorDefault),
      },
    },
    box: {
      borderRadius: 2,
      paddingLeft: '5px',
      backgroundColor: backgroundColorDefault,
      color: theme.palette.getContrastText(backgroundColorDefault),
    },
    componentSelected: {
      position: 'relative',
      '&::after': {
        content: '""',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        position: 'absolute',
        pointerEvents: 'none',
        border: [[1, 'dashed', theme.palette.primary.main]],
      },
    },
    paper: {
      overflow: 'auto',
    },
    nodeName: {
      marginRight: theme.spacing(1),
    },
    popper: {
      zIndex: 1102, // more than app-bar and indicator z-index
      '&[x-placement*="bottom"] $arrow': {
        top: 0,
        left: 0,
        marginTop: '-0.9em',
        width: '3em',
        height: '1em',
        '&::before': {
          borderWidth: '0 1em 1em 1em',
          borderColor: `transparent transparent ${theme.palette.background.paper} transparent`,
        },
      },
      '&[x-placement*="top"] $arrow': {
        bottom: 0,
        left: 0,
        marginBottom: '-0.9em',
        width: '3em',
        height: '1em',
        '&::before': {
          borderWidth: '1em 1em 0 1em',
          borderColor: `${theme.palette.background.paper} transparent transparent transparent`,
        },
      },
      '&[x-placement*="right"] $arrow': {
        left: 0,
        marginLeft: '-0.9em',
        height: '3em',
        width: '1em',
        '&::before': {
          borderWidth: '1em 1em 1em 0',
          borderColor: `transparent ${theme.palette.background.paper} transparent transparent`,
        },
      },
      '&[x-placement*="left"] $arrow': {
        right: 0,
        marginRight: '-0.9em',
        height: '3em',
        width: '1em',
        '&::before': {
          borderWidth: '1em 0 1em 1em',
          borderColor: `transparent transparent transparent ${theme.palette.background.paper}`,
        },
      },
    },
    arrow: {
      position: 'absolute',
      fontSize: 7,
      width: '3em',
      height: '3em',
      '&::before': {
        content: '""',
        margin: 'auto',
        display: 'block',
        width: 0,
        height: 0,
        borderStyle: 'solid',
      },
    },
    title: {
      display: 'flex',
      alignItems: 'center',
    },
  };
});

export const RenderNode = ({ render }) => {
  const classes = useStyles();
  const currentRef = useRef();
  const [arrowRef, setArrowRef] = React.useState(null);
  const { actions, query, selected } = useEditor((state, query) => {
    const currentNodeId = state.events.selected;
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings:
          state.nodes[currentNodeId].related &&
          state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return {
      selected,
    };
  });

  const {
    id,
    isActive,
    isHover,
    dom,
    name,
    moveable,
    deletable,
    connectors: { drag },
    parent,
  } = useNode((node) => ({
    isActive: node.events.selected,
    isHover: node.events.hovered,
    dom: node.dom,
    name: node.data.custom.displayName || node.data.displayName,
    moveable: query.node(node.id).isDraggable(),
    deletable: query.node(node.id).isDeletable(),
    parent: node.data.parent,
  }));

  useEffect(() => {
    if (dom) {
      if (isActive || isHover) dom.classList.add(classes.componentSelected);
      else dom.classList.remove(classes.componentSelected);
    }
  }, [dom, isActive, isHover]);

  const getPos = useCallback((dom) => {
    const { top, left, bottom, width, height } = dom
      ? dom.getBoundingClientRect()
      : { top: 0, left: 0, bottom: 0 };
    return {
      top: top > 0 ? top : bottom,
      left,
      width,
      height,
    };
  }, []);

  const scroll = useCallback(() => {
    const { current: currentDOM } = currentRef;

    if (!currentDOM) return;
    const { top, left } = getPos(dom);
    currentDOM.style.top = top;
    currentDOM.style.left = left;
  }, [dom]);

  // useEffect(() => {
  //   document
  //     .querySelector('.craftjs-renderer')
  //     .addEventListener('scroll', scroll);

  //   return () => {
  //     document
  //       .querySelector('.craftjs-renderer')
  //       .removeEventListener('scroll', scroll);
  //   };
  // }, [scroll]);

  return (
    <>
      {isActive && (
        <Portal container={dom}>
          <div
            ref={currentRef}
            className={classes.indicator}
            style={{
              left: 0,
              bottom: 0,
            }}
          >
            <Box className={classes.box}>
              <div className={classes.title}>
                <Typography variant="h6" className={classes.nodeName}>
                  {name}
                </Typography>
                <Divider orientation="vertical" flexItem />
                <ButtonGroup variant="text" size="small">
                  {moveable ? (
                    <Button size="medium" ref={drag}>
                      <OpenWithIcon />
                    </Button>
                  ) : null}
                  {id !== ROOT_NODE && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        actions.selectNode(parent);
                      }}
                    >
                      <ArrowUpwardIcon />
                    </Button>
                  )}
                  {deletable && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        actions.delete(id);
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  )}
                  {selected.settings && (
                    <PopupState
                      variant="popper"
                      popupId="settings-panel-popper"
                    >
                      {(popupState) => (
                        <div>
                          <Tooltip title="Settings Panel">
                            <Button {...bindToggle(popupState)}>
                              <MoreIcon />
                            </Button>
                          </Tooltip>
                          <Popper
                            {...bindPopper(popupState)}
                            className={classes.popper}
                            placement={id === ROOT_NODE ? 'top' : 'bottom'}
                            disablePortal={false}
                            modifiers={{
                              flip: {
                                enabled: false,
                              },
                              preventOverflow: {
                                enabled: true,
                                boundariesElement: 'scrollParent',
                              },
                              arrow: {
                                enabled: true,
                                element: arrowRef,
                              },
                            }}
                          >
                            <span className={classes.arrow} ref={setArrowRef} />
                            <Paper className={classes.paper}>
                              <Box p={2}>
                                <SettingsPanel />
                              </Box>
                            </Paper>
                          </Popper>
                        </div>
                      )}
                    </PopupState>
                  )}
                </ButtonGroup>
              </div>
            </Box>
          </div>
        </Portal>
      )}
      {render}
    </>
  );
};
