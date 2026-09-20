import TagSparkThumbnailScreen from '@/components/TagSparkThumbnailScreen';

export function TagSparkAmbientThumbnail() {
  return (
    <div className="yap-thumbnail-device">
      <span className="yap-thumbnail-device__volume" aria-hidden="true" />
      <span className="yap-thumbnail-device__power" aria-hidden="true" />
      <div className="yap-thumbnail-device__screen">
        <span className="yap-thumbnail-device__island" aria-hidden="true" />
        <TagSparkThumbnailScreen />
      </div>
    </div>
  );
}
