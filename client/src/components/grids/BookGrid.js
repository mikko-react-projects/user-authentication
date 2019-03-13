import React from 'react';
import PropTypes from 'prop-types';
import { Image, Card, Modal, Button } from "semantic-ui-react";

const BookGrid = ({ books, removeBook }) => (
  <div>

    <Card.Group itemsPerRow={6}>
      {books.map(book => (
        <Card key={book._id}>
          <Image src={book.cover} />
          <Card.Content>
            <Card.Description><b>{book.title}</b></Card.Description>
            <Card.Description>{book.authors}</Card.Description>

            <Modal size="small" trigger={<Button size="mini">Remove</Button>} >
              <Modal.Header>Remove book</Modal.Header>
              <Modal.Content image>
                <Image
                  wrapped
                  size='medium'
                  src={book.cover}
                />
                <p>Are you sure you want to remove {book.title}?</p>
              </Modal.Content>
              <Modal.Actions>
                <Button
                  onClick={() => removeBook(book)}
                  positive
                  icon='checkmark'
                  labelPosition='right'
                  content='Remove'
                />
              </Modal.Actions>
            </Modal>

          </Card.Content>
        </Card>
      ))}
    </Card.Group>

  </div>
);

BookGrid.propTypes = {
  books: PropTypes.shape({
    title: PropTypes.string.isRequired,
    authors: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired
  }).isRequired,
  removeBook: PropTypes.func.isRequired
};

export default BookGrid;
