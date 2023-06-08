import { SimpleForm } from '~/types/form';

export default function PreviewForm({ form }: { form: SimpleForm }) {
  return (
    <div
      style={{
        border: '1px solid black',
        padding: '1em',
        width: '80%',
        display: 'grid',
        overflowY: 'scroll',
      }}
    >
      <span>Customer Number: {form.customerNumber}</span>
      <h3>Customer Data</h3>
      <span>Business Name: {form.customerDetails.businessName}</span>
      <span>Contact: {form.customerDetails.contact}</span>

      <h3>Address</h3>
      <span>Street: {form.address.street}</span>
      <span>Postal Code: {form.address.postalCode}</span>

      <h3>Internal</h3>
      <span>Handler FOV: {form.internal.handlerFov}</span>
      <span>Order Number: {form.internal.orderNumber}</span>
      <span>Form date: {form.internal.formDate}</span>

      <h3>Items</h3>
      {Object.entries(form.items).map(([key, item]) => (
        <div key={key} style={{ border: '1px solid red', marginBottom: '1em', display: 'grid' }}>
          <span>Item: {key}</span>
          <span>Article Number: {item.articleNumber}</span>
          <span>Description: {item.description}</span>
          <span>Unit: {item.unit}</span>
          <span>Quantity: {item.quantity}</span>
        </div>
      ))}

      <h3>Reasons</h3>
      <span>Notes: {form.reasons.textReasons}</span>
      {Object.entries(form.reasons)
        .slice(1)
        .map(([key, value]) => (
          <span key={key}>
            {key}: {value ? 'Yes' : 'No'}
          </span>
        ))}
      <h3>Actions</h3>
      {Object.entries(form.actions).map(([key, action]) => (
        <div key={key}>
          <span>{key}</span>
          <input type="checkbox" checked={action.used} readOnly />
          <table>
            <tbody>
              <tr>
                <td>Performed by</td>
                <td>Completed</td>
              </tr>
              <tr>
                <td>{action.performedBy}</td>
                <td>{action.completed || 'No'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
