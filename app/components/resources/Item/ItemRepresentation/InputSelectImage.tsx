import React, { useEffect, useState } from "react";

export default function InputSelectImage({
  useStateItem,
}: {
  useStateItem: { item: any; setItem: any };
}) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      useStateItem.setItem((prev_item: any) => {
        return {
          ...prev_item,
          representation_image: file,
        };
      });
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      {preview && (
        <div style={{ marginTop: "10px" }}>
          <h4>Image Preview:</h4>
          <div
            style={{
              width: "200px",
              height: "200px",
              backgroundImage: `url(${preview})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </div>
      )}
    </div>
  );
}
