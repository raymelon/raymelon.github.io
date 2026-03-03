import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const portfolioDir = path.join(__dirname, '..', 'public', 'assets', 'portfolio');

async function convertImages() {
  try {
    const files = await fs.readdir(portfolioDir);
    const imageFiles = files.filter(f => f.match(/\.(png|jpg|jpeg)$/i));
    
    console.log(`Found ${imageFiles.length} images to convert\n`);
    
    let totalBefore = 0;
    let totalAfter = 0;
    
    for (const file of imageFiles) {
      const inputPath = path.join(portfolioDir, file);
      const outputName = file.replace(/\.[^.]+$/, '.webp');
      const outputPath = path.join(portfolioDir, outputName);
      
      try {
        // Check if WebP already exists
        try {
          await fs.access(outputPath);
          console.log(`⏭️  ${file} - WebP already exists, skipping`);
          continue;
        } catch (e) {
          // WebP doesn't exist, proceed with conversion
        }
        
        const stats = await fs.stat(inputPath);
        const beforeSize = stats.size;
        
        await sharp(inputPath)
          .webp({ quality: 80, effort: 4 })
          .toFile(outputPath);
        
        const afterStats = await fs.stat(outputPath);
        const afterSize = afterStats.size;
        
        const reduction = ((beforeSize - afterSize) / beforeSize * 100).toFixed(1);
        
        console.log(`✅ ${file}`);
        console.log(`   Before: ${(beforeSize/1024).toFixed(1)}KB → After: ${(afterSize/1024).toFixed(1)}KB (${reduction}% reduction)\n`);
        
        totalBefore += beforeSize;
        totalAfter += afterSize;
      } catch (err) {
        console.error(`❌ Error converting ${file}:`, err.message);
      }
    }
    
    if (totalBefore > 0) {
      const totalReduction = ((totalBefore - totalAfter) / totalBefore * 100).toFixed(1);
      console.log(`\n📊 Total:`);
      console.log(`   Before: ${(totalBefore/1024/1024).toFixed(2)}MB`);
      console.log(`   After: ${(totalAfter/1024/1024).toFixed(2)}MB`);
      console.log(`   Saved: ${totalReduction}%`);
    }
    
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

convertImages();
