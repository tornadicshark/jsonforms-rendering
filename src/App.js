import React, { useState, useEffect, useMemo } from 'react';
import { JsonForms } from '@jsonforms/react';
import { person } from '@jsonforms/examples';
import { materialRenderers } from '@jsonforms/material-renderers';
import {Button} from '@mui/material';
import * as _ from 'lodash';

const schema = person.schema;
const uischema = person.uischema;
const initialData = person.data;
const initialForm = {'person1': {...initialData}, 'person2': {}};

function App() {
  const [formData, setFormData] = useState({'person1': {...initialData}, 'person2': {}})
  const [data, setData] = useState(initialData)
  const [people, setPeople] = useState(['person1','person2'])

  const updateFormData = (person, data) => {
    // const form = _.cloneDeep(formData)
    formData[`${person}`] = data
    if (formData[`${person}`].nationality !== undefined) {
      formData[`${person}`].occupation= 'Hello World'
    }
    // console.log(formData)

    setFormData({...formData})
  }

  const resetForm = () => {
    setFormData(initialForm)
  }

  const peopleForms = 
    people.map((person) => {
      return (
        <PersonForm
          name={person}
          schema={schema}
          uischema={uischema}
          data={formData[`${person}`]}
          renderers={materialRenderers}
          handleChange={updateFormData}
        />
      )
      })

  useEffect(() => {
    console.log(`rendering multiple form...`, formData)
  }, [formData])

  useEffect(() => {
    console.log(`rendering single form...`, data)
  }, [data])

  const updateData = (data) => {
    if (data.nationality !== undefined) {
      data.occupation= 'Hello World'
    }
    setData(data)
  }

  return (
    <div className="App">
     {peopleForms}
     <Button id="reset" onClick={resetForm}>Reset</Button>
    <h1>Next...</h1>
     <JsonForms
          key={'single'}
          schema={schema}
          uischema={uischema}
          data={data}
          renderers={materialRenderers}
          onChange={({ errors, data }) => updateData(data)}
        />
    </div>
  );
}

function PersonForm(props) {
  const {name, schema, uischema, data, renderers, handleChange} = props

  // useEffect(() => console.log(`${name} rendering...`, props), []);

  return (
        <>
        <h1> {name} </h1>
        <JsonForms
          key={name}
          schema={schema}
          uischema={uischema}
          data={data}
          renderers={renderers}
          onChange={({ errors, data }) => handleChange(name, data)}
        />
        </>
      );
}



export default App;