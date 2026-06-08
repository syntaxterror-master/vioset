import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const Search = () => {
  return (
      <Field className="max-w-80">
      <ButtonGroup>
      <Input aria-label="input-button-group" id="input-button-group" placeholder="Type to search..." />
      <Button variant="outline">Search</Button>
      </ButtonGroup>
      </Field>
  )
}

export default Search