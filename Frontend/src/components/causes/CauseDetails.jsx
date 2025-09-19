import React from 'react';
import { MapPin, Calendar, DollarSign, Target, Share2, Clock, Users } from 'lucide-react';
import { PrimaryButton, SecondaryButton } from '../buttons';

const CauseDetails = ({ cause }) => {
  const API_BASE_URL = 'http://localhost:3000';

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/default-avatar.avif';
    return `${API_BASE_URL}${imagePath}`;
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  const progressPercentage = Math.min((cause.amountCollected / cause.budgetRequired) * 100, 100);

  const getStatusConfig = (status) => {
    switch (status) {
      case 'active': 
        return { 
          bg: 'bg-emerald-100', 
          text: 'text-emerald-800', 
          dot: 'bg-emerald-500',
          label: 'Active'
        };
      case 'completed': 
        return { 
          bg: 'bg-blue-100', 
          text: 'text-blue-800', 
          dot: 'bg-blue-500',
          label: 'Complete'
        };
      case 'paused': 
        return { 
          bg: 'bg-amber-100', 
          text: 'text-amber-800', 
          dot: 'bg-amber-500',
          label: 'Paused'
        };
      default: 
        return { 
          bg: 'bg-gray-100', 
          text: 'text-gray-800', 
          dot: 'bg-gray-500',
          label: status
        };
    }
  };

  const statusConfig = getStatusConfig(cause.status);
  const daysLeft = Math.max(0, Math.ceil((new Date(cause.endDate) - new Date()) / (1000 * 60 * 60 * 24)));

  return (
    <div className="space-y-4">
      {/* Compact Header */}
      <div className="flex flex-col sm:flex-row gap-4">
        
        {/* Compact Image */}
        <div className="flex-shrink-0">
          <img
            src={getImageUrl(cause.featureImage)}
            alt={cause.name}
            className="w-full sm:w-48 h-32 object-cover rounded-lg"
            onError={(e) => {
              e.target.src = '/default-avatar.avif';
            }}
          />
        </div>

        {/* Title and Status */}
        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h1 className="text-xl font-bold text-gray-900 leading-tight">{cause.name}</h1>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Share2 className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Status Badges */}
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`}></div>
              {statusConfig.label}
            </div>
            
            {cause.isUrgent && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">
                <Clock className="w-3 h-3" />
                Urgent
              </div>
            )}
          </div>

          <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">{cause.description}</p>
        </div>
      </div>

      {/* Progress Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900">Progress</h2>
          <div className="text-right">
            <div className="text-lg font-bold text-blue-600">{Math.round(progressPercentage)}%</div>
            <div className="text-xs text-gray-600">funded</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white rounded-full h-2.5 shadow-inner mb-3">
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full transition-all duration-700"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {/* Financial Details */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-green-600">{formatCurrency(cause.amountCollected)}</div>
            <div className="text-xs text-gray-600">raised</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">{formatCurrency(cause.budgetRequired)}</div>
            <div className="text-xs text-gray-600">goal</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">{daysLeft}</div>
            <div className="text-xs text-gray-600">days left</div>
          </div>
        </div>
      </div>

      {/* Campaign Details */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <Target className="w-4 h-4 text-blue-600" />
          Campaign Details
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-100 rounded-lg">
              <MapPin className="w-3 h-3 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-700">Location</p>
              <p className="text-xs text-gray-900">{cause.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-green-100 rounded-lg">
              <Target className="w-3 h-3 text-green-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-700">Type</p>
              <p className="text-xs text-gray-900 capitalize">{cause.type}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-orange-100 rounded-lg">
              <DollarSign className="w-3 h-3 text-orange-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-700">Goal</p>
              <p className="text-xs text-gray-900 font-semibold">{formatCurrency(cause.budgetRequired)}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-purple-100 rounded-lg">
              <Calendar className="w-3 h-3 text-purple-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-700">Ends</p>
              <p className="text-xs text-gray-900">
                {new Date(cause.endDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Still needed message */}
      {cause.budgetRequired - cause.amountCollected > 0 && (
        <div className="text-center py-2 px-3 bg-blue-50 rounded-lg">
          <span className="text-xs font-medium text-blue-800">
            {formatCurrency(cause.budgetRequired - cause.amountCollected)} still needed
          </span>
        </div>
      )}
    </div>
  );
};

export default CauseDetails;