import { useState, useEffect } from 'react';
import { getProfile, getSkills, getProjects, getExperience } from '../services/api';

export const useProfile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile()
      .then(res => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
};

export const useSkills = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSkills()
      .then(res => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
};

export const useProjects = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then(res => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
};

export const useExperience = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExperience()
      .then(res => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
};