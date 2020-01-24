import {
  required,
  minLength
} from '@bpw/validate-vue'

export const formModel = {
  type: 'object',
  title: 'Create a new contractor',
  description: 'Create a new contractor description text',
  properties: {
    name: {
      type: 'object',
      title: 'Name of the contractor',
      description: 'Name of the contractor',
      required: ['firstName', 'lastName'],
      properties: {
        firstName: {
          type: 'string',
          minLength: 8,
          maxLength: 80,
          title: 'First Name',
          attrs: {
            placeholder: 'Your First Name',
            title: 'Please enter your first name'
          }
        },
        lastName: {
          type: 'string',
          minLength: 8,
          maxLength: 80,
          title: 'Last Name',
          attrs: {
            placeholder: 'Your Last Name',
            title: 'Please enter your last name'
          }
        }
      }
    },
    email: {
      type: 'string',
      maxLength: 120,
      title: 'Email',
      attrs: {
        type: 'email',
        placeholder: 'Your Email',
        title: 'Please enter your email'
      }
    },
    agency: {
      type: 'string',
      title: 'Agency',
      enum: ['DAS', 'JFS'],
      attrs: {
        placeholder: 'Select your agency',
        title: 'Please select your agency'
      }
    },
    jobDescription: {
      type: 'string',
      textarea: true,
      maxLength: 120,
      title: 'Job Description',
      description: 'Ex. Portal Development',
      attrs: {
        placeholder: 'Job Description'
      }
    },
    agree: {
      type: 'string',
      title: 'Agree',
      description: 'You agree to the terms and conditions.',
      default: 'not_accepted',
      attrs: {
        type: 'checkbox',
        'unchecked-value': 'not_accepted',
        'checked-value': 'accepted'
      }
    },
    addresses: {
      type: 'array',
      title: 'Addresses',
      description: 'You addresses.',
      default: [],
      properties: {
        address: {
          type: 'object',
          title: 'Address of the contractor',
          description: 'Address of the contractor',
          required: ['street', 'town', 'zip'],
          properties: {
            street: {
              type: 'string',
              minLength: 8,
              maxLength: 80,
              title: 'Street',
              attrs: {
                placeholder: 'Your Street Address',
                title: 'Please enter your street address'
              }
            },
            town: {
              type: 'string',
              minLength: 8,
              maxLength: 80,
              title: 'Town',
              attrs: {
                placeholder: 'Your Town',
                title: 'Please enter your town'
              }
            },
            zip: {
              type: 'string',
              minLength: 8,
              maxLength: 80,
              title: 'Zip',
              attrs: {
                placeholder: 'Your Zip',
                title: 'Please enter your zip'
              }
            }
          }
        }
      }
    }
  },
  additionalProperties: false,
  required: ['email', 'agency'],
  layout: {
    rows: [{
      columns: [{
        componentType: 'input',
        fieldName: 'name.firstName',
        option: {
          cols: '6',
          sm: '12',
          md: '12',
          native: false
        }
      },
      {
        componentType: 'input',
        fieldName: 'name.lastName',
        option: {
          cols: '6',
          sm: '12',
          md: '12'
        }
      }]
    },
    {
      columns: [{
        componentType: 'input',
        fieldName: 'email',
        option: {
          cols: '8',
          native: false
        }
      },
      {
        componentType: 'input',
        fieldName: 'agency',
        option: {
          cols: '4',
          native: false
        }
      }]
    },
    {
      columns: [{
        componentType: 'input',
        fieldName: 'jobDescription',
        option: {}
      }]
    },
    {
      columns: [{
        componentType: 'input',
        fieldName: 'agree',
        option: {
          cols: '2'
        }
      }, {
        componentType: 'table',
        fieldName: 'addresses',
        option: {
          cols: '10'
        },
        rows: [{
          columns: [{
            componentType: 'input',
            fieldName: 'addresses.address.street',
            option: {
              cols: '12',
              sm: '12',
              md: '12',
              native: false
            }
          }]
        }, {
          columns: [{
            componentType: 'input',
            fieldName: 'addresses.address.town',
            option: {
              cols: '8',
              native: false
            }
          }, {
            componentType: 'input',
            fieldName: 'addresses.address.zip',
            option: {
              cols: '4',
              native: false
            }
          }]
        }]
      }]
    }]
  },
  validations: {
    data: {
      email: {
        required
      },
      jobDescription: {
        required,
        minLength: minLength(3)
      },
      name: {
        firstName: {
          required,
          minLength: minLength(3)
        }
      },
      validationGroup: ['email', 'jobDescription', 'name.firstName'],
      addresses: {
        required,
        minLength: minLength(1),
        $each: {
          address: {
            street: {
              required,
              minLength: minLength(2)
            },
            town: {
              required,
              minLength: minLength(2)
            },
            zip: {
              required,
              minLength: minLength(2)
            }
          }
        }
      }
    }
  }
}
