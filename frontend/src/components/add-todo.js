import React, {useState} from 'react';
import TodoDataService from '../services/todos';
import {Link} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const AddTodo = props => {
    let editting = false;
    let initialTodoTitle = "";
    let initialTodoMemo = "";

    if (props.location.state && props.location.state.currentTodo) {
        editting = true;
        initialTodoTitle = props.location.state.currentTodo.title;
        initialTodoMemo = props.location.state.currentTodo.memo;
    }

    const [title, setTitle] = useState(initialTodoTitle);
    const [memo, setMemo] = useState(initialTodoMemo);
    const [submitted, setSubmitted] = useState(false);

    const onChangeTitle = e => {
        const title = e.target.value;
        setTitle(title);
    }

    const onChangeMemo = e => {
        const memo = e.target.value;
        setMemo(memo);
    }

    const saveTodo = () => {
        const data = {
            title: title,
            memo: memo,
            completed: false,
        }

        if (editting) {
            TodoDataService.updateTodo(
                props.location.state.currentTodo.id,
                data,
                props.token
            )
                .then(response => {
                    setSubmitted(true);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        } else {
            TodoDataService.createTodo(data, props.token)
                .then(response => {
                    setSubmitted(true);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    return (
        <Container>
            {
                submitted ? (
                    <div>
                        <h4>Todo submitted successfully</h4>
                        <Link to={"/todos"}>
                            Back to Todos
                        </Link>
                    </div>
                ) : (
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>{ editting ? "Edit" : "Create" } Todo</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={title}
                                placeholder="e.g. buy gift tomorrow"
                                onChange={onChangeTitle}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={memo}
                                onChange={onChangeMemo}
                            />
                        </Form.Group>
                        <Button variant="info" onClick={saveTodo}>
                            { editting ? "Edit" : "Add" } Todo
                        </Button>
                    </Form>
                )
            }
        </Container>
    )
}

export default AddTodo;
