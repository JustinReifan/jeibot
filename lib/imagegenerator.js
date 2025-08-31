const starryai = require("@api/starryai");

starryai.auth("wF0j2MDXaf0l5oHnupNqhd4yIc7VSg");

// Fungsi untuk membuat gambar baru dengan parameter input dari user
const createImage = async (
  prompt,
  numImages = 1,
  aspectRatio = "square",
  model = "lyra"
) => {
  try {
    if (prompt.length >= 3 && prompt.length <= 765) {
      console.log("🔄 Requesting AI image generation...");

      const response = await starryai.new_creation_creations__post({
        prompt: prompt,
        model: model, // Bisa "orion" untuk style lain
        aspect_ratio: aspectRatio, // Menggunakan aspect ratio dari input
        images: numImages, // Jumlah gambar yang diminta
        highResolution: true,
      });

      //   console.log("✅ Image request submitted:", response.data);
      //   return response.data.id;
      return {
        status: "true",
        message: "✅Generate in process..",
        data: response.data.id,
      };
    } else if (typeof prompt == undefined) {
      //   throw new Error("Isi prompt dahulu..");
      return {
        status: "false",
        message: "isi prompt dahulu",
      };
    } else {
      return {
        status: "false",
        message: "Jumlah prompt minimal 3 huruf & maksimal 765 huruf",
      };
      //   throw new Error("Jumlah prompt minimal 3 huruf & maksimal 765 huruf");
    }
  } catch (error) {
    // console.error("❌ Error creating image:", error.message);
    return {
      status: "false",
      message: `Error generating image: ${error.message}`,
    };
  }
};

// Fungsi untuk mengecek status dan mendapatkan hasil gambar
const checkStatusAndGetImage = async (creationId) => {
  try {
    console.log("⏳ Checking image generation status...");

    while (true) {
      const creationData =
        await starryai.get_creation_creations__creation_id__get({
          creation_id: creationId,
        });

      //   console.log(`📢 Status: ${creationData.data.status}`);

      if (creationData.data.status === "completed") {
        const images = creationData.data.images;

        // console.log("🖼️ Generated Images:", images);
        // return images;
        return {
          status: "true",
          message: "Generate completed, sending images..",
          data: images,
        };
      }

      // Tunggu 10 detik sebelum mengecek lagi
      await new Promise((resolve) => setTimeout(resolve, 10000));
    }
  } catch (error) {
    // console.error("❌ Error fetching image:", error.detail.msg);
    return {
      status: "false",
      message: `Error fetching image: ${error.detail.msg}`,
    };
  }
};

// Fungsi utama yang bisa diekspor ke file lain
// const generate_image = async (prompt, numImages, aspectRatio) => {
//   const creationId = await createImage(prompt, numImages, aspectRatio);
//   if (creationId.status) {
//     const images = await checkStatusAndGetImage(creationId.data, numImages);
//     return images.data; // Mengembalikan hasil gambar dalam bentuk array object
//   } else {
//     console.log("Id gambar tidak ditemukan!");
//   }
// };

// Ekspor fungsi run agar bisa digunakan di file lain
module.exports = { createImage, checkStatusAndGetImage };
