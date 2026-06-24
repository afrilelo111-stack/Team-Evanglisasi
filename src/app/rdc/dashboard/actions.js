// app/admin/dashboard/actions.js
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

// 1. CREATE - Menambah item baru
export async function addItem(formData) {
  try {
    const supabase = await createClient();
    const imageUrl = formData.get('imageUrl');
    const description = formData.get('description');
    
    // ─── AMBIL FIELD BARU ───
    const category = formData.get('category');

    console.log('[addItem] imageUrl:', imageUrl);
    console.log('[addItem] description:', description);
    console.log('[addItem] category:', category);

    if (!imageUrl) {
      return { error: 'Gambar dan deskripsi wajib diisi.' };
    }

    // Masukkan data category ke dalam array insert
    const { data, error } = await supabase
      .from('gallery') // Pastikan nama tabel sesuai dengan yang ada di database
      .insert([{ 
        image_url: imageUrl, 
        description: description,
        category: category, // Masuk ke kolom 'category'
      }])
      .select();

    if (error) {
      console.error('[addItem] Database error:', error);
      return { error: 'Gagal menyimpan data: ' + error.message };
    }

    console.log('[addItem] Success, data:', data);
    revalidatePath('/rdc/dashboard');
    return { success: true };

  } catch (err) {
    console.error('[addItem] Unexpected error:', err);
    return { error: 'Terjadi kesalahan: ' + err.message };
  }
}

// 2. UPDATE - Mengedit item yang sudah ada
export async function updateItem(itemId, formData) {
  try {
    const supabase = await createClient();
    
    const imageUrl = formData.get('imageUrl');
    const description = formData.get('description');
    
    // ─── AMBIL FIELD BARU UNTUK UPDATE ───
    const category = formData.get('category');

    if (!imageUrl || !description) {
      return { error: 'Gambar dan deskripsi wajib diisi.' };
    }

    // Perbarui objek update agar menyertakan category
    const { error } = await supabase
      .from('gallery') // Pastikan nama tabel sesuai dengan yang ada di database
      .update({ 
        image_url: imageUrl, 
        description: description,
        category: category, // Perbarui kolom 'category'
      })
      .eq('id', itemId);

    if (error) {
      console.error('Database update error:', error);
      return { error: 'Gagal memperbarui data: ' + error.message };
    }

    revalidatePath('/rdc/dashboard');
    return { success: true };
    
  } catch (err) {
    console.error('[updateItem] Unexpected error:', err);
    return { error: 'Terjadi kesalahan: ' + err.message };
  }
}

// 3. DELETE - Menghapus item
export async function deleteItem(itemId) {
  const supabase = await createClient();
  
  // Opsional: Hapus juga file gambar dari Storage
  // ... (kode untuk hapus dari storage)

  const { error } = await supabase
    .from('gallery') // Pastikan nama tabel sesuai dengan yang ada di database
    .delete()
    .eq('id', itemId);

  if (error) {
    console.error('Database delete error:', error);
    return { error: 'Gagal menghapus data.' };
  }

  revalidatePath('/rdc/dashboard');
  redirect('/rdc/dashboard');
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/admin/login');
}