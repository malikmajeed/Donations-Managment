import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, ShoppingCart } from 'lucide-react';
import { WishListButton, SponsorButton, PrimaryButton, SecondaryButton } from '../buttons';
import { useDeleteCause } from '../../hooks/useCauses';
import Modal from '../common/Modal';
import CauseDetails from './CauseDetails';

const API_BASE_URL = 'http://localhost:3000';

export default function CauseCard({ cause, onDonate, onUpdate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const deleteCauseMutation = useDeleteCause();

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this cause?')) return;
    deleteCauseMutation.mutate(cause._id);
  };

  const handleViewDetails = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const progressPercentage = Math.min((cause.amountCollected / cause.budgetRequired) * 100, 100);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
 
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };



  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={
            cause.featureImage
              ? `${API_BASE_URL}${cause.featureImage}`
              : '/default-avatar.avif'
          }
          alt={cause.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Top-left badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {cause.isUrgent && (
            <span className="bg-red-600 text-white text-xs font-semibold px-2 py-0.5 rounded">
              Urgent
            </span>
          )}
          <span className={`text-xs font-medium px-2 py-0.5 rounded ${getStatusColor(cause.status)}`}>
            {cause.status.charAt(0).toUpperCase() + cause.status.slice(1)}
          </span>
        </div>

        {/* Top-right badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded">
            {Math.round(progressPercentage)}% funded
          </span>
        </div>

        {/* Add to Cart */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <WishListButton
            item={{
              id: cause._id,
              name: cause.name,
              description: cause.description,
              featureImage: cause.featureImage
                ? `${API_BASE_URL}${cause.featureImage}`
                : '/default-avatar.avif',
              budgetRequired: cause.budgetRequired,
              amount: cause.budgetRequired,
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title and Type */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{cause.name}</h3>
        
        </div>

        {/* Location */}
        <div className="flex items-center text-sm text-gray-500 gap-1">
          <MapPin className="h-4 w-4" />
          <span>{cause.location}</span>
        </div>

        {/* Budget and progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-blue-600">{formatCurrency(cause.amountCollected)} raised</span>
            <span className="text-gray-500">of {formatCurrency(cause.budgetRequired)}</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          <div className="text-xs text-gray-500">
            {cause.budgetRequired - cause.amountCollected > 0
              ? `${formatCurrency(cause.budgetRequired - cause.amountCollected)} still needed`
              : 'Fully funded!'}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <SponsorButton
              item={{
                id: cause._id,
                name: cause.name,
                description: cause.description,
                featureImage: cause.featureImage
                  ? `${API_BASE_URL}${cause.featureImage}`
                  : '/default-avatar.avif',
                amount: cause.budgetRequired,
              }}
          >
            Donate
          </SponsorButton>
          <SecondaryButton onClick={handleViewDetails}>
            View Details
          </SecondaryButton>
        </div>
      </div>

      {/* View Cause Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        showHeader={false}
        maxWidth="max-w-5xl"
        footer={
          <div className="flex gap-3">
            <PrimaryButton className="flex-1 py-2 text-sm font-semibold rounded-lg">
              Donate Now
            </PrimaryButton>
            <SecondaryButton className="flex-1 py-2 text-sm font-semibold rounded-lg">
              Share Campaign
            </SecondaryButton>
          </div>
        }
      >
        <CauseDetails cause={cause} />
      </Modal>
    </motion.div>
  );
}
