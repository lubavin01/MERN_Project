import React, { useState, useContext, useEffect, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { Loader } from '../components/Loader';
import { LinksList } from '../components/LinksList';

export const LinksPage = () => {
  const [links, setLinks] = useState();
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);

  const fetchedLinks = useCallback(async () => {
    try {
      const fetched = await request('/api/link', 'GET', null, {
        Authorization: `Bearer ${token}`
      });
      setLinks(fetched);
    } catch (e) {

    }
  }, [token, request]);

  useEffect(() => { fetchedLinks() }, [fetchedLinks]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {!loading && <LinksList links={links} />}
    </>
  )
}