<template>
  <el-dialog
    v-model="editingStore.editing"
    :title="editingStore.dialogTitle"
    width="400px"
    @open="onOpen"
    @close="editingStore.$reset()"
  >
    <el-form
      :model="editingStore"
      :rules="rules"
      label-width="60px"
      ref="formRef"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="editingStore.name"></el-input>
      </el-form-item>

      <el-form-item label="图标" prop="icon">
        <!--        todo:懒加载-->
        <img :src="editingStore.icon" class="w-[20px] h-[20px] mr-[10px]" />
        <!--上传和选择图标 start  -->
        <el-popover
          placement="right"
          width="400px"
          popper-class="h-[400px]"
          v-model:visible="popShow"
        >
          <template #reference>
            <el-button size="small" @click="popShow = !popShow"
              >切换图标</el-button
            >
          </template>
          <template #default>
            <div class="flex flex-col h-full">
              <div class="flex-1">
                <img
                  v-for="(item, index) in iconList"
                  :key="index"
                  :src="item.path"
                  class="inline-block w-[25px] h-[25px] cursor-pointer m-[5px]"
                  @click="editingStore.icon = item.path"
                />
              </div>
              <div class="flex justify-end right">
                <el-upload
                  :action="url"
                  :headers="header"
                  :show-file-list="false"
                  :on-success="onUpSuccess"
                  class="mr-[10px]"
                >
                  <el-button size="small">
                    上传图标<el-icon><Upload /></el-icon>
                  </el-button>
                </el-upload>
                <el-button size="small" @click="popShow = false">
                  关闭
                </el-button>
              </div>
            </div>
          </template>
        </el-popover>
        <!--上传和选择图标 end  -->
      </el-form-item>

      <!--      tags    -->
      <el-form-item label="标签" prop="tags">
        <el-tag
          v-for="(tag, index) in editingStore.tags"
          :key="'tag' + index"
          closable
          class="mr-[2px]"
          @close="removeListItem(editingStore.tags, tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
          v-if="tags.inputVisible"
          ref="tagInputRef"
          v-model="tags.inputValue"
          size="small"
          style="width: 70px"
          @keyup.enter="tags.handleInputConfirm"
          @blur="tags.handleInputConfirm"
        />
        <el-button v-else size="small" @click="tags.showInput">
          + 新增
        </el-button>
      </el-form-item>

      <!--      table   -->
      <el-form-item label="属性">
        <div class="border border-gray-200 rounded-[4px] p-[2px] w-full">
          <div class="flex">
            <span class="w-1/2 text-center">属性名</span>
            <span class="w-1/2 text-center">属性值</span>
          </div>
          <div
            class="flex"
            v-for="(item, index) in editingStore.table"
            :key="'table' + index"
          >
            <el-button
              size="small"
              @click="
                editingStore.table.splice(index + 1, 0, { key: '', value: '' })
              "
            >
              +
            </el-button>
            <el-input class="w-1/2" size="small" v-model="item.key"></el-input>
            <el-input
              class="w-1/2"
              size="small"
              v-model="item.value"
            ></el-input>
            <el-button
              size="small"
              @click="
                editingStore.table.length === 1
                  ? (editingStore.table = [{ key: '', value: '' }])
                  : editingStore.table.splice(index, 1)
              "
            >
              -
            </el-button>
          </div>
        </div>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancelClick">取消</el-button>
        <el-button type="primary" @click="onConfirmClick">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { nextTick, reactive, ref, watchEffect } from 'vue';
import { Upload } from '@element-plus/icons-vue';
import { getMap } from '@/components/VMap/mapInstance.js';
import { useEditingPointStore } from '@/store/editingFeature.js';
import { addPointIcon, getPointIconList } from '@/api/pointIcon.js';
import { removeListItem } from '@/utils/removeListItem.js';

const editingStore = useEditingPointStore();

const iconList = ref([]);
const popShow = ref(false);
watchEffect(() => {
  if (!editingStore.editing) popShow.value = false;
});

async function onOpen() {
  const res = await getPointIconList();
  iconList.value = res.data.rows;
  if (!editingStore.id) editingStore.icon = iconList.value[0].path;
}

const rules = reactive({
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
});
const formRef = ref(null);

async function onConfirmClick() {
  const [err] = await window.to(formRef.value.validate());
  if (err) return;
  const map = getMap();
  if (editingStore.id) {
    await map.mm.editPoint(editingStore);
  } else {
    await map.mm.addPoint(editingStore);
  }
  onCancelClick();
}

function onCancelClick() {
  const map = getMap();
  map.resetCursor();
  editingStore.$reset();
}

// 图标上传
const url = ref(import.meta.env.VITE_APP_SERVER_URL + '/upload');
const header = ref({
  Authorization: 'Bearer ' + localStorage.getItem('token')
});
async function onUpSuccess(res) {
  if (res.code !== 200) {
    ElMessage.error({ message: '上传失败：' + res.message });
    return;
  }
  const path = res.data.path;
  await addPointIcon({ path });
  const iconListRes = await getPointIconList();
  iconList.value = iconListRes.data.rows;
}

// tags编辑
const tagInputRef = ref();
const tags = reactive({
  inputVisible: false,
  inputValue: '',
  handleInputConfirm: () => {
    if (tags.inputValue) {
      editingStore.tags.push(tags.inputValue);
    }
    tags.inputVisible = false;
    tags.inputValue = '';
  },
  showInput: () => {
    tags.inputVisible = true;
    nextTick(() => {
      tagInputRef.value.input.focus();
    });
  }
});
</script>

<style scoped></style>
