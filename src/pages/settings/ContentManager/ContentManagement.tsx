import { ContentManagerProvider, useContentManager } from './context';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import { popBreadcrumb } from 'redux/actions/breadcrumb.actions';
import { useDispatch } from 'react-redux';
import { setBreadcrumbs } from 'redux/actions/breadcrumb.actions';
import { CircularProgress } from '@mui/material';
import FileSelector from './components/Uploader/FileSelector';

import FileUploadingContainer from './components/Uploader/FileUploadingContainer';
import UserSamplesContainer from './components/Uploads/UserSamplesContainer';

const ContentManagerInner = () => {
  const { 
    uploadingFile 
  } = useContentManager();
  const [loading, setLoading] = useState(false);
  const [updateData, setUpdateData] = useState(0);

  return (
    <div>
      <h2 className="text-white px-3 py-4 text-xl font-semibold border-b border-eclipseGray">
        Content Management
      </h2>

      <div className="px-3">
        <FileSelector />
        {uploadingFile && (
          <FileUploadingContainer modal={false}/>
        )}
        <UserSamplesContainer
          setLoading={setLoading}
          updateData={updateData}
        />
      </div>

      {loading && (
        <>
          <div className="absolute top-0 left-0 z-50 bg-black opacity-40 pointer-events-none w-full h-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999px]">
            <CircularProgress
              sx={{
                width: "80px !important",
                height: "80px !important",
                color: "#9EFF00",
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

const ContentManagement = () => {
  const user = useSelector((state: RootState) => state.auth?.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        { name: 'Settings', path: '/settings' },
        { name: 'Content Management', path: '/settings/content-management' }
      ]));
    return () => {
      dispatch(popBreadcrumb());
    }; 
  }, [dispatch]);

  return (
    <>
      {user && (
        <ContentManagerProvider>
          <ContentManagerInner />
        </ContentManagerProvider>
      )}
    </>
  );
};

export default ContentManagement;