import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/Button';

export default function DeleteConfirmationDialog({ isOpen, onClose, onConfirm, title }) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full">
          <Dialog.Title className="text-xl font-semibold mb-4">
            Confirm Delete
          </Dialog.Title>
          <Dialog.Description className="text-gray-600 dark:text-gray-300 mb-6">
            Are you sure you want to delete "{title}"? This action cannot be undone.
          </Dialog.Description>
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="destructive" className="bg-red-500 text-white " onClick={onConfirm}>
              Delete
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
} 