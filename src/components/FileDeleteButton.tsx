'use client';

export default function FileDeleteButton() {
  return (
    <div>
      <button
        onClick={() => {
          console.log('Delete');
        }}
      >
        Delete
      </button>
    </div>
  );
}
