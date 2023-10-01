'use client';
import TagInput from '@/components/editor/TagInput';
import { articleTextarea } from '@/styles/article.css';
import { container, input } from '@/styles/common.css';
import { editorForm, editorButton } from '@/styles/editor.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

const EditorPage = () => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    body: '',
    tagList: [],
  });

  const { mutate } = useMutation({
    mutationFn: () =>
      fetch('/api/articles/new', { method: 'POST', body: JSON.stringify({ article: formData }) }).then(res =>
        res.json()
      ),
    onSuccess: data => {
      console.log('등록 성공');

      console.log(data);
      queryClient.invalidateQueries(['articles', 'global']);
    },
    onError: (error: any) => {
      console.log('에러 발생');
      console.error(error);
    },
  });

  const handleClick = () => {
    mutate();
  };

  const handleChange = (e: any) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <section className={container}>
      <div className={editorForm}>
        <input
          type="text"
          name="title"
          className={input}
          placeholder="Article Title"
          onChange={handleChange}
          value={formData.title}
        />
        <input
          type="text"
          name="description"
          className={input}
          placeholder="What's this article about?"
          onChange={handleChange}
          value={formData.description}
        />
        <textarea
          rows={8}
          name="body"
          className={articleTextarea}
          placeholder="Write your article (in markdown)"
          onChange={handleChange}
          value={formData.body}
        ></textarea>
        <TagInput setFormData={setFormData} />
        <div>
          <button className={editorButton} onClick={handleClick}>
            Publish Article
          </button>
        </div>
      </div>
    </section>
  );
};

export default EditorPage;
