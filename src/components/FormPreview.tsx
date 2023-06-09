import { SimpleForm } from '~/types/form';
import {
  CustomerDetailsWrapper,
  InternalDetailsTable,
  ItemTableStyled,
  PreviewTextarea,
  ReasonWrapper,
  SpanValueStyle,
} from './InputForm.styled';

export default function PreviewForm({ form }: { form: SimpleForm }) {
  return (
    <div>
      <h1>Retour Afhaalopdracht</h1>
      <h1 className="logo">FOV</h1>
      {/* html line tag */}
      <hr
        style={{
          borderWidth: '1px',
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <SpanValueStyle>
          <span> Customer Number: </span>
          {form.customerNumber}
        </SpanValueStyle>
        <SpanValueStyle>
          <span>Form date:</span> {form.internal.formDate}
        </SpanValueStyle>
      </div>
      <hr />

      <CustomerDetailsWrapper>
        <div>
          <SpanValueStyle inline="column">
            <span>Business Name: </span>
            {form.customerDetails.businessName}
          </SpanValueStyle>
          <SpanValueStyle inline="column">
            <span>Contact Person: </span> {form.customerDetails.contact}
          </SpanValueStyle>
        </div>
        <div>
          <SpanValueStyle inline="column">
            <span>Street: </span>
            {form.address.street}
          </SpanValueStyle>
          <SpanValueStyle inline="column">
            <span>Postal Code: </span>
            {form.address.postalCode}
          </SpanValueStyle>
        </div>
      </CustomerDetailsWrapper>
      {/* <h3>Internal</h3> */}
      <hr />
      <CustomerDetailsWrapper>
        {/* Internal */}
        <div>
          <SpanValueStyle inline="column">
            <span>Handler FOV: </span>
            {form.internal.handlerFov}
          </SpanValueStyle>
        </div>
        <div>
          <SpanValueStyle inline="column">
            <span>Order Number: </span>
            {form.internal.orderNumber}
          </SpanValueStyle>
        </div>
        {/* <span>Form date: {form.internal.formDate}</span> */}
      </CustomerDetailsWrapper>
      <h3>Retour te halen</h3>
      <ItemTableStyled>
        <thead>
          <tr>
            <th>Article Number</th>
            <th>Description</th>
            <th>Unit</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(form.items).map(([key, item]) => (
            <tr key={key}>
              <td>{item.articleNumber}</td>
              <td>{item.description}</td>
              <td>{item.unit}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </ItemTableStyled>

      <h3>Reden Retour</h3>
      <ReasonWrapper>
        <div>
          <PreviewTextarea name="" id="" value={form.reasons.textReasons} disabled />
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
          }}
        >
          {Object.entries(form.reasons)
            .slice(1)
            .map(([key, value]) => (
              <label key={key} style={{ flexWrap: 'nowrap' }}>
                <input type="checkbox" checked={value as boolean} readOnly />
                {/* {key}: {value ? 'Yes' : 'No'} */}
                {key}
              </label>
            ))}
        </div>
      </ReasonWrapper>
      <h3>Gemaakte afspraken / EVT. ADR Regels</h3>
      <PreviewTextarea
        name=""
        id=""
        value={form.agreements.text}
        disabled
        style={{
          width: '100%',
        }}
      />
      {/* <span>Notes: {form.agreements.text}</span> */}
      <h3>Actions</h3>
      <ItemTableStyled>
        <thead>
          <tr>
            <th
              style={{
                border: 'none',
              }}
            ></th>
            <th>Performed by</th>
            <th>Completed (date)</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(form.actions).map(([key, action]) => (
            <tr key={key} style={{ width: 'auto' }}>
              <td
                style={{
                  border: 'none',
                  fontSize: '1.1rem',
                  display: 'flex',
                  alignItems: 'flex-end',
                  paddingLeft: '0px',
                }}
              >
                <input
                  type="checkbox"
                  checked={action.used}
                  readOnly
                  style={{
                    marginRight: '10px',
                  }}
                />
                {key}
              </td>
              <td
                style={{
                  width: '45%',
                }}
              >
                {action.performedBy}
              </td>
              <td
                style={{
                  width: '30%',
                }}
              >
                {action.completed ? String(action.completed) : ''}
              </td>
            </tr>
          ))}
        </tbody>
      </ItemTableStyled>
      {/* {Object.entries(form.actions).map(([key, action]) => (
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
      ))} */}
    </div>
  );
}
