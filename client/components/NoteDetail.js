import React, { Component } from 'react';

import TextField from './TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Link, Redirect } from 'react-router-dom';
import marked from 'marked';

import fetchUndoneTodos from '../queries/fetchUndoneTodos';
import fetchDoneTodos from '../queries/fetchDoneTodos';
import s from './noteDetail.css'
import PrefilledTextfield from './PrefilledTextfield';

class NoteDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id ? this.props.id : "",
      title: this.props.title ? this.props.title : "",
      content: this.props.content ? this.props.content : "",
      editing: false,
      contentMarkdown: this.props.content ? marked(this.props.content) : "",
      submitted: false,
    };
  }

  onSubmit() {
    event.preventDefault();

    if (this.props.mutate) {
      this.props.mutate({
        variables: {
          id: this.state.id,
          title: this.state.title,
          content: this.state.content,
        },
        refetchQueries: [
          { query: fetchUndoneTodos },
          { query: fetchDoneTodos }
        ],
      })
    }

    this.setState({ submitted: true });
  }

  handleMarkdown() {
    this.setState({
      editing: false,
      contentMarkdown: {
        __html: marked(this.state.content)
      },
    });
  }

  enableEditing() {
    this.setState({ editing: true });
  }

  handleContentField() {
    if (this.state.editing) {
      return (
        <TextField
          floatingLabelText="Content"
          onChange={ event => this.setState({ content: event.target.value }) }
          value={ this.state.content }
          name="content"
          onBlur={this.handleMarkdown.bind(this)}
          multiLine={true}
          fullWidth={true}
        />
      )
    } else {
      return (
        <PrefilledTextfield
          content={this.state.content}
          onClick={this.enableEditing.bind(this)}
        />
      )
    }
  }

  render() {
    if (this.state.submitted) {
      return <Redirect to="/" />
    } else {
      return (
        <section className={ s.wrapper }>
          <Link to="/" className={ s.backButton }>Back</Link>
          <TextField
            floatingLabelText="Title"
            onChange={ event => this.setState({ title: event.target.value }) }
            value={ this.state.title }
            name="title"
            multiLine
            fullWidth
          /><br />
          { this.handleContentField() }
          <RaisedButton
            label="Done"
            primary
            onClick={ this.onSubmit.bind(this) }
            className={ s.button }
          />
        </section>
      )
    }
  }
};

export default NoteDetail;
