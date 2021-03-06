import React, { useRef, useEffect, useMemo, useState } from 'react'
import AsyncSelect from 'react-select/async'

import { useField } from '@rocketseat/unform'
import PropTypes from 'prop-types'

export default function AsyncSelectorComponent({
  name,
  loadOptions,
  noOptionsMessage,
  ...rest
}) {
  const ref = useRef()
  const { fieldName, registerField, defaultValue, error } = useField(name)
  const [value, setValue] = useState(defaultValue)

  useMemo(() => setValue(defaultValue), [defaultValue]) //eslint-disable-line

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.value',
    })
  }, [ref.current, fieldName]) // eslint-disable-line

  function handleChange(selectedValue) {
    setValue(selectedValue)
  }

  return (
    <>
      <AsyncSelect
        name={fieldName}
        loadOptions={loadOptions}
        value={value}
        ref={ref}
        onChange={handleChange}
        getOptionValue={option => option.id}
        getOptionLabel={option => option.name}
        className="react-asyncselect-container"
        classNamePrefix="react-asyncselect"
        placeholder="Selecione..."
        loadingMessage={() => 'Carregando...'}
        noOptionsMessage={() =>
          noOptionsMessage || 'Nenhum registro encontrado'
        }
        {...rest}
      />

      {error && <span>{error}</span>}
    </>
  )
}

AsyncSelectorComponent.defaultProps = {
  noOptionsMessage: null,
}

AsyncSelectorComponent.propTypes = {
  name: PropTypes.string.isRequired,
  loadOptions: PropTypes.func.isRequired,
  noOptionsMessage: PropTypes.string,
}
