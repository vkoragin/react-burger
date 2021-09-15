import PropTypes from 'prop-types'

export const ingredient = PropTypes.shape(
  {
    "_id":PropTypes.string.isRequired,
    "name":PropTypes.string.isRequired,
    "type":PropTypes.string.isRequired,
    "proteins":PropTypes.number.isRequired,
    "fat":PropTypes.number.isRequired,
    "carbohydrates":PropTypes.number.isRequired,
    "calories":PropTypes.number.isRequired,
    "price":PropTypes.number.isRequired,
    "image":PropTypes.string.isRequired,
    "image_mobile":PropTypes.string.isRequired,
    "image_large":PropTypes.string.isRequired,
    "__v":PropTypes.number
  }
)

export const order = PropTypes.shape(
  {
    "ingredients": PropTypes.arrayOf(PropTypes.string).isRequired,
    "_id": PropTypes.string.isRequired,
    "status": PropTypes.string.isRequired,
    "number": PropTypes.number.isRequired,
    "createdAt": PropTypes.string.isRequired,
    "updatedAt": PropTypes.string.isRequired
  }
)
