import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';

import { Card, CardText, CardActions, CardHeader } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import DoneIcon from 'material-ui/svg-icons/action/done';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';

import s from './todolist.css';
import fetchUndoneTodos from '../queries/fetchUndoneTodos';
import deleteTodo from '../mutations/deleteTodo';

class TodoList extends Component {
  handleDelete(id) {
    this.props.mutate({
      variables: { id }
    }).then(() => this.props.data.refetch());
  }

  renderSongs() {
    return this.props.data.todos.map(todo => {
      return (
        <Card key={ todo.id } className={s.card}>
          <CardHeader
            title={ todo.title }
          />
          <CardText>{ todo.content }</CardText>
          <CardActions className={s.cardActions}>
            <IconButton
              tooltip="Mark as done"
            >
              <DoneIcon color={'rgba(0,0,0,0.54)'}/>
            </IconButton>
            <IconButton
              tooltip="Edit"
            >
              <EditIcon color={'rgba(0,0,0,0.54)'}/>
            </IconButton>
            <IconButton
              tooltip="Delete"
              onClick={() => this.handleDelete(todo.id)}>
              <DeleteIcon color={'rgba(0,0,0,0.54)'}/>
            </IconButton>
          </CardActions>
        </Card>
      )
    })
  }

  render() {
    return (
      <div className={s.todoListWrapper}>
        { this.props.data.loading
          ? <div>Loading ... </div>
          : <div className={s.wrapper}>
            <div className={s.container}>
              { this.renderSongs() }
            </div>
          </div>
        }
        <Link to="/add">
          <FloatingActionButton
            className={s.actionButton}>
            <ContentAdd />
          </FloatingActionButton>
        </Link>
      </div>
    )
  }
};

export default graphql(deleteTodo)(
  graphql(fetchAllTodos)(TodoList)
);
