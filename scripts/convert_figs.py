#!/usr/bin/env python3
"""Re-convert PDF figures to high-res PNG using macOS Quartz."""
import subprocess
import os
import sys

try:
    import Quartz
    from CoreFoundation import CFURLCreateFromFileSystemRepresentation
    HAS_QUARTZ = True
except ImportError:
    HAS_QUARTZ = False

def convert_pdf_quartz(pdf_path, png_path, scale=4):
    """Convert PDF to PNG using macOS Quartz at high resolution."""
    import Quartz
    from CoreFoundation import CFURLCreateFromFileSystemRepresentation
    
    pdf_url = Quartz.CFURLCreateFromFileSystemRepresentation(
        None, pdf_path.encode('utf-8'), len(pdf_path.encode('utf-8')), False
    )
    pdf_doc = Quartz.CGPDFDocumentCreateWithURL(pdf_url)
    if pdf_doc is None:
        print(f"  ERROR: Cannot open {pdf_path}")
        return False
    
    page = Quartz.CGPDFDocumentGetPage(pdf_doc, 1)
    if page is None:
        print(f"  ERROR: No page in {pdf_path}")
        return False
    
    page_rect = Quartz.CGPDFPageGetBoxRect(page, Quartz.kCGPDFMediaBox)
    w = int(page_rect.size.width * scale)
    h = int(page_rect.size.height * scale)
    
    cs = Quartz.CGColorSpaceCreateDeviceRGB()
    ctx = Quartz.CGBitmapContextCreate(
        None, w, h, 8, w * 4, cs,
        Quartz.kCGImageAlphaPremultipliedLast
    )
    
    # White background
    Quartz.CGContextSetRGBFillColor(ctx, 1.0, 1.0, 1.0, 1.0)
    Quartz.CGContextFillRect(ctx, Quartz.CGRectMake(0, 0, w, h))
    
    # Scale and draw
    Quartz.CGContextScaleCTM(ctx, scale, scale)
    Quartz.CGContextDrawPDFPage(ctx, page)
    
    # Save
    image = Quartz.CGBitmapContextCreateImage(ctx)
    png_url = Quartz.CFURLCreateFromFileSystemRepresentation(
        None, png_path.encode('utf-8'), len(png_path.encode('utf-8')), False
    )
    dest = Quartz.CGImageDestinationCreateWithURL(png_url, 'public.png', 1, None)
    Quartz.CGImageDestinationAddImage(dest, image, None)
    Quartz.CGImageDestinationFinalize(dest)
    
    print(f"  OK: {w}x{h}")
    return True


def convert_pdf_sips(pdf_path, png_path):
    """Fallback: use sips."""
    r = subprocess.run(
        ['sips', '-s', 'format', 'png', pdf_path, '--out', png_path],
        capture_output=True, text=True
    )
    return r.returncode == 0


figs_dir = 'CSBench_icml2026/figs'
out_dir = 'static/images'

pdfs = {
    'category&language.pdf': 'category_language.png',
    'pass_at_k.pdf': 'pass_at_k.png',
    'failure_distribution.pdf': 'failure_distribution.png',
    'case-252.pdf': 'case-252.png',
}

for pdf_name, png_name in pdfs.items():
    pdf_path = os.path.join(figs_dir, pdf_name)
    png_path = os.path.join(out_dir, png_name)
    print(f"Converting: {pdf_name} -> {png_name}")
    if not os.path.exists(pdf_path):
        print(f"  NOT FOUND: {pdf_path}")
        continue
    
    if HAS_QUARTZ:
        convert_pdf_quartz(pdf_path, png_path, scale=4)
    else:
        convert_pdf_sips(pdf_path, png_path)
        print("  Used sips fallback")

# Verify final sizes
print("\n=== Final image sizes ===")
for png_name in pdfs.values():
    png_path = os.path.join(out_dir, png_name)
    r = subprocess.run(['sips', '-g', 'pixelWidth', '-g', 'pixelHeight', png_path],
                      capture_output=True, text=True)
    lines = r.stdout.strip().split('\n')
    w = [l for l in lines if 'pixelWidth' in l]
    h = [l for l in lines if 'pixelHeight' in l]
    print(f"  {png_name}: {w[0].strip() if w else '?'} {h[0].strip() if h else '?'}")
