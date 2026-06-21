import { useState } from "react";

import {
  Button,
  Input,
  Loader,
  Modal,
  Toast,
} from "../components/ui";

export default function ComponentDemo() {
  const [open, setOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">

      <h1 className="text-4xl font-bold mb-10">
        Component Library Demo
      </h1>

      <div className="flex flex-wrap gap-4 mb-10">
        <Button>Primary Button</Button>

        <Button variant="secondary">
          Secondary Button
        </Button>

        <Button variant="outline">
          Outline Button
        </Button>
      </div>

      <div className="mb-10">
        <Input
          label="Your Name"
          placeholder="Enter name"
        />
      </div>

      <div className="mb-10">
        <Loader />
      </div>

      <div className="flex gap-4">

        <Button
          onClick={() => setOpen(true)}
        >
          Open Modal
        </Button>

        <Button
          variant="secondary"
          onClick={() => {
            setShowToast(true);

            setTimeout(() => {
              setShowToast(false);
            }, 3000);
          }}
        >
          Show Toast
        </Button>

      </div>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Demo Modal"
      >
        <p>
          This is a reusable modal component.
        </p>
      </Modal>

      {showToast && (
        <Toast message="Toast Working Successfully!" />
      )}

    </div>
  );
}