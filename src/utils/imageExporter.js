import { toPng, toJpeg, toSvg, toCanvas } from "html-to-image";

// Supported download formats and their file/mime metadata.
const FORMAT_CONFIG = {
	PNG: { extension: "png", mime: "image/png" },
	JPEG: { extension: "jpeg", mime: "image/jpeg" },
	WebP: { extension: "webp", mime: "image/webp" },
	SVG: { extension: "svg", mime: "image/svg+xml" },
};

export const DOWNLOAD_FORMATS = Object.keys(FORMAT_CONFIG);

export const getFormatConfig = (format) =>
	FORMAT_CONFIG[format] || FORMAT_CONFIG.PNG;

/**
 * Render a DOM element to an image data URL in the requested format.
 *
 * PNG/JPEG/SVG are produced directly by html-to-image. SVG output embeds the
 * cover markup as an <svg> document (foreignObject), giving a lossless,
 * infinitely scalable vector file. WebP is produced by rendering to a canvas
 * and re-encoding, since html-to-image has no native WebP encoder.
 */
export async function generateImageDataUrl(element, format, options = {}) {
	switch (format) {
		case "JPEG":
			return toJpeg(element, { ...options, quality: 0.95 });
		case "SVG":
			return toSvg(element, options);
		case "WebP": {
			const canvas = await toCanvas(element, options);
			return canvas.toDataURL("image/webp", 0.95);
		}
		case "PNG":
		default:
			return toPng(element, options);
	}
}
