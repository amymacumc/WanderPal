'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types/user';
import { createUser } from '@/utils/api';

const ProfilePage = () => {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    age: '',
    location: '',
    mbti: '',
  });

  const ageOptions = Array.from({ length: 83 }, (_, i) => i + 18); // 18-100
  const mbtiTypes = [
    'INTJ', 'INTP', 'ENTJ', 'ENTP',
    'INFJ', 'INFP', 'ENFJ', 'ENFP',
    'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
    'ISTP', 'ISFP', 'ESTP', 'ESFP',
  ];

  const locations = [
    '北京', '上海', '广州', '深圳', '杭州',
    '成都', '武汉', '西安', '南京', '重庆',
    '苏州', '天津', '长沙', '郑州', '青岛',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const userData: User = {
        ...formData
      };

      const response = await createUser(userData);
      
      if (response.code === 0) {
        // Successfully created user, redirect to plan page
        router.push('/');
      } else {
        setError(response.message || '创建用户失败，请重试');
      }
    } catch (err) {
      setError('创建用户失败，请重试');
      console.error('Error creating user:', err);
    }
  };

  const handleSkip = () => {
    router.push('/plan');
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Hi👋</h1>
          <p className="text-gray-600">为帮助我们定制专属你的行程计划，请填写以下信息</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nickname */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">昵称</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Summer"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">性别</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, gender: '男' })}
                className={`p-3 text-center rounded-lg border ${
                  formData.gender === '男'
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'border-gray-300 text-gray-700'
                }`}
              >
                男
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, gender: '女' })}
                className={`p-3 text-center rounded-lg border ${
                  formData.gender === '女'
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'border-gray-300 text-gray-700'
                }`}
              >
                女
              </button>
            </div>
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">年龄</label>
            <select
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">请选择</option>
              {ageOptions.map((age) => (
                <option key={age} value={age}>
                  {age}岁
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">所在地区</label>
            <select
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">请选择</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* MBTI */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">MBTI</label>
            <select
              value={formData.mbti}
              onChange={(e) => setFormData({ ...formData, mbti: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">请选择</option>
              {mbtiTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gray-500 text-white py-3 rounded-full hover:bg-gray-600 transition-colors"
          >
            选好了，开启行程规划
          </button>

          {/* Skip Button */}
          <button
            type="button"
            onClick={handleSkip}
            className="w-full text-gray-500 py-2 text-sm"
          >
            跳过
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
