import React from 'react'

const FileForm = props => (
  <form
    className="form"
    onSubmit={e =>
      props.handleSubmit(
        e,
        props.isValidUpload(props.MAX_FILE_SIZE, props.MAX_TEXT_LEN),
        props.fileInput
      )
    }
  >
    <input
      hidden
      type="text"
      name="date"
      id="date"
      value={props.date}
      onChange={props.handleChange}
      ref={props.fileDate}
    />
    <label htmlFor="file">
      File: {` `}
      <input type="file" name="file" id="file" ref={props.fileInput} />
      <br />
      <small>{`max file-size ${props.MAX_FILE_GB} GB`}</small>
    </label>
    <label htmlFor="text">
      File Info:
      <br />
      <textarea
        type="text"
        name="text"
        id="text"
        rows="5"
        cols="30"
        value={props.text}
        onChange={props.handleChange}
      />
      <br />
      <small
        style={
          props.text.length <= props.MAX_TEXT_LEN
            ? { color: 'green' }
            : { color: 'red' } // red indicates text is too long
        }
      >
        {props.text.length <= props.MAX_TEXT_LEN
          ? `Characters available: ${props.MAX_TEXT_LEN - props.text.length}`
          : 'Please shorten your description.'}
      </small>
    </label>
    <input className="btn" type="submit" value="Submit" />
  </form>
)

export default FileForm
