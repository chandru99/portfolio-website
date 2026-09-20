import './TagRow.css'

function TagRow({ items }) {
  return (
    <ul className="tag-row">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export default TagRow
